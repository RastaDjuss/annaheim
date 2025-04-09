// src/components/anaheim/environment.ts
// Ensure process is defined for environments supporting process.env
declare const process: { env: { [key: string]: string | undefined } };
export const CONFIG = {
    CLUSTER: "https://api.mainnet-beta.solana.com", // Replace this with the cluster based on your project.
    PROGRAM_ID: process.env.NEXT_PUBLIC_PROGRAM_ID,
    RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
};