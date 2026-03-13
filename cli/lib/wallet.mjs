import { readWallet, saveWallet, WALLET_FILE, API } from "./config.mjs";

const HELP = `run402 wallet — Manage your x402 wallet

Usage:
  run402 wallet <subcommand>

Subcommands:
  status    Show wallet address, network, and funding status
  create    Generate a new wallet and save it locally
  fund      Request test USDC from the Run402 faucet (Base Sepolia)
  balance   Show on-chain USDC (mainnet + testnet) and Run402 billing balance
  export    Print the wallet address (useful for scripting)

Notes:
  - Wallet is stored locally at ~/.run402/wallet.json
  - The wallet works on any EVM chain (currently Run402 uses Base Mainnet and Sepolia for testnet)
  - You need to create and fund a wallet before any x402 transaction with Run402

Examples:
  run402 wallet create
  run402 wallet status
  run402 wallet fund
  run402 wallet export
`;

const USDC_ABI = [{ name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }] }];
const USDC_MAINNET = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_SEPOLIA = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

async function loadDeps() {
  const { generatePrivateKey, privateKeyToAccount } = await import("viem/accounts");
  const { createPublicClient, http } = await import("viem");
  const { base, baseSepolia } = await import("viem/chains");
  return { generatePrivateKey, privateKeyToAccount, createPublicClient, http, base, baseSepolia };
}

async function status() {
  const w = readWallet();
  if (!w) {
    console.log(JSON.stringify({ status: "no_wallet", message: "No wallet found. Run: run402 wallet create" }));
    return;
  }
  console.log(JSON.stringify({ status: "ok", address: w.address, created: w.created, funded: w.funded || false, path: WALLET_FILE }));
}

async function create() {
  if (readWallet()) {
    console.log(JSON.stringify({ status: "error", message: "Wallet already exists. Use 'status' to check it." }));
    process.exit(1);
  }
  const { generatePrivateKey, privateKeyToAccount } = await loadDeps();
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  saveWallet({ address: account.address, privateKey, created: new Date().toISOString(), funded: false });
  console.log(JSON.stringify({ status: "ok", address: account.address, message: `Wallet created. Stored locally at ${WALLET_FILE}` }));
}

async function fund() {
  const w = readWallet();
  if (!w) { console.log(JSON.stringify({ status: "error", message: "No wallet. Run: run402 wallet create" })); process.exit(1); }
  const res = await fetch(`${API}/v1/faucet`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ address: w.address }) });
  const data = await res.json();
  if (res.ok) {
    saveWallet({ ...w, funded: true, lastFaucet: new Date().toISOString() });
    console.log(JSON.stringify({ status: "ok", ...data }));
  } else {
    console.log(JSON.stringify({ status: "error", ...data }));
    process.exit(1);
  }
}

async function readUsdcBalance(client, usdc, address) {
  const raw = await client.readContract({ address: usdc, abi: USDC_ABI, functionName: "balanceOf", args: [address] });
  return Number(raw) / 1e6;
}

async function balance() {
  const w = readWallet();
  if (!w) { console.log(JSON.stringify({ status: "error", message: "No wallet. Run: run402 wallet create" })); process.exit(1); }

  const { createPublicClient, http, base, baseSepolia } = await loadDeps();
  const mainnetClient = createPublicClient({ chain: base, transport: http() });
  const sepoliaClient = createPublicClient({ chain: baseSepolia, transport: http() });

  const [mainnetUsdc, sepoliaUsdc, billingRes] = await Promise.all([
    readUsdcBalance(mainnetClient, USDC_MAINNET, w.address).catch(() => null),
    readUsdcBalance(sepoliaClient, USDC_SEPOLIA, w.address).catch(() => null),
    fetch(`${API}/v1/billing/accounts/${w.address.toLowerCase()}`),
  ]);

  const billing = billingRes.ok ? await billingRes.json() : null;

  console.log(JSON.stringify({
    address: w.address,
    onchain: {
      "base-mainnet": mainnetUsdc !== null ? `${mainnetUsdc} USDC` : "unavailable",
      "base-sepolia": sepoliaUsdc !== null ? `${sepoliaUsdc} USDC` : "unavailable",
    },
    run402: billing || "no billing account",
  }, null, 2));
}

async function exportAddr() {
  const w = readWallet();
  if (!w) { console.log(JSON.stringify({ status: "error", message: "No wallet." })); process.exit(1); }
  console.log(w.address);
}

export async function run(sub, args) {
  if (!sub || sub === '--help' || sub === '-h') {
    console.log(HELP);
    process.exit(0);
  }
  switch (sub) {
    case "status":  await status(); break;
    case "create":  await create(); break;
    case "fund":    await fund(); break;
    case "balance": await balance(); break;
    case "export":  await exportAddr(); break;
    default:
      console.error(`Unknown subcommand: ${sub}\n`);
      console.log(HELP);
      process.exit(1);
  }
}
