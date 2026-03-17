/**
 * Run402 config loader — thin wrapper over core/ shared modules.
 * Adds CLI-specific behavior: process.exit() on errors.
 */

import { getApiBase, getConfigDir, getKeystorePath, getAllowancePath } from "../core-dist/config.js";
import { readAllowance as coreReadAllowance, saveAllowance as coreSaveAllowance } from "../core-dist/allowance.js";
import { loadKeyStore, getProject, saveProject, updateProject, removeProject, saveKeyStore, getActiveProjectId, setActiveProjectId } from "../core-dist/keystore.js";

export const CONFIG_DIR = getConfigDir();
export const ALLOWANCE_FILE = getAllowancePath();
export const PROJECTS_FILE = getKeystorePath();
export const API = getApiBase();

export function readAllowance() {
  return coreReadAllowance();
}

export function saveAllowance(data) {
  coreSaveAllowance(data);
}

export async function allowanceAuthHeaders() {
  const w = readAllowance();
  if (!w) { console.error(JSON.stringify({ status: "error", message: "No agent allowance found. Run: run402 allowance create" })); process.exit(1); }
  const { privateKeyToAccount } = await import("viem/accounts");
  const account = privateKeyToAccount(w.privateKey);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = await account.signMessage({ message: `run402:${timestamp}` });
  return { "X-Run402-Wallet": account.address, "X-Run402-Signature": signature, "X-Run402-Timestamp": timestamp };
}

export function findProject(id) {
  const p = getProject(id);
  if (!p) { console.error(`Project ${id} not found in local registry.`); process.exit(1); }
  return p;
}

export function resolveProject(id) {
  const projectId = id || getActiveProjectId();
  if (!projectId) { console.error("Error: no project specified and no active project set. Run: run402 projects provision"); process.exit(1); }
  return findProject(projectId);
}

export function resolveProjectId(id) {
  const projectId = id || getActiveProjectId();
  if (!projectId) { console.error("Error: no project specified and no active project set. Run: run402 projects provision"); process.exit(1); }
  return projectId;
}

// Re-export core keystore functions for direct use
export { loadKeyStore, saveProject, updateProject, removeProject, saveKeyStore, getActiveProjectId, setActiveProjectId };
