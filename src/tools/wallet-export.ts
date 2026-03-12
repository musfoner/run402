import { z } from "zod";
import { getWalletPath } from "../config.js";
import { readFileSync, existsSync } from "node:fs";

export const walletExportSchema = {};

export async function handleWalletExport(
  _args: Record<string, never>,
): Promise<{ content: Array<{ type: "text"; text: string }>; isError?: boolean }> {
  const walletPath = getWalletPath();

  if (!existsSync(walletPath)) {
    return {
      content: [
        {
          type: "text",
          text: "No wallet found. Use `wallet_create` to create one.",
        },
      ],
      isError: true,
    };
  }

  try {
    const wallet = JSON.parse(readFileSync(walletPath, "utf-8"));
    return {
      content: [{ type: "text", text: wallet.address }],
    };
  } catch {
    return {
      content: [
        {
          type: "text",
          text: `Error: Could not read wallet file at ${walletPath}`,
        },
      ],
      isError: true,
    };
  }
}
