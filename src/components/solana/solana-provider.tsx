"use client";

import dynamic from "next/dynamic";
import { WalletError } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ReactNode, useCallback, useMemo } from "react";
import { useCluster } from "@/components/cluster/cluster-data-access";
import { AnchorProvider } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";

export function useAnchorProvider() {
    const { connection } = useConnection();
    const wallet = useWallet();

    // AnchorProvider is used here
    return new AnchorProvider(connection, wallet as any, {
        commitment: "confirmed",
    });
}

require("@solana/wallet-adapter-react-ui/styles.css");

// Dynamically load WalletMultiButton to prevent SSR issues
export const WalletButton = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    {
        ssr: false, // Don't render during SSR
    }
);

export function SolanaProvider({ children }: { children: ReactNode }) {
    const { cluster } = useCluster();

    if (!cluster) {
        throw new Error(
            "Cluster is undefined! Ensure ClusterProvider is wrapping your app."
        );
    }

    // Use cluster.endpoint to define Solana connection endpoint
    const endpoint = useMemo(
        () => cluster.endpoint || "http://localhost:8899",
        [cluster]
    );

    const onError = useCallback((error: WalletError) => {
        console.error("Wallet Error:", error);
    }, []);

    if (typeof window === "undefined") {
        return null; // Prevent SSR issues
    }

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}