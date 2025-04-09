'use client'
import './environment' // Ensure environment variables are loaded for the correct paths.
import { useMemo } from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { Program, AnchorProvider } from '@project-serum/anchor'
import { Connection, PublicKey, Keypair } from '@solana/web3.js'
import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {IdlTypes, ProgramAccount} from "@coral-xyz/anchor";
import { TypeDef } from '@coral-xyz/anchor/dist/cjs/program/namespace/types'
import {IdlAccountDef} from "@project-serum/anchor/dist/cjs/idl";
// Import IDL location (adjust based on your folder structure)
import rawIdl from '../../../../anchor/target/idl/anaheim.json' assert { type: 'json' }

const idl = { ...rawIdl, version: rawIdl.metadata.version, name: rawIdl.metadata.name };

function useAnaheimQuery(param: {
    initialData: undefined;
    queryKey: string[];
    queryFn: () => Promise<ProgramAccount<TypeDef<({
        address: string,
        metadata: { name: string, version: string, spec: string, description: string },
        instructions: {},
        accounts: {},
        types: {}
    } & { version: string; name: string })["accounts"] extends undefined ? IdlAccountDef : NonNullable<({
        address: string,
        metadata: { name: string, version: string, spec: string, description: string },
        instructions: {},
        accounts: {},
        types: {}
    } & { version: string; name: string })["accounts"]>[number], IdlTypes<{
        address: string,
        metadata: { name: string, version: string, spec: string, description: string },
        instructions: {},
        accounts: {},
        types: {}
    } & { version: string; name: string }>>>[]>;

    enabled: boolean
}, param2: { onError: (error: any) => void }) {

}

export function useAnaheimProgram() {
    const wallet = useAnchorWallet()

    const programId = useMemo(() => {
        const programAddress = process.env.NEXT_PUBLIC_PROGRAM_ID
        return programAddress ? new PublicKey(programAddress) : null
    }, [])

    const program = useMemo(() => {
        if (wallet && programId) {
            const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL
            if (!rpcUrl) throw new Error('RPC URL is not set')
            const connection = new Connection(rpcUrl, 'processed')
            const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'processed' })
            return new Program(idl, programId, provider)
        }
        return null
    }, [wallet, programId])

    const accounts = useAnaheimQuery({
        initialData: undefined,
        queryKey: ['anaheim', 'accounts'],
        queryFn: async () => {
            if (!program) throw new Error('Program is not initialized');
            return await program.account.anaheim.all();
        },
        enabled: !!program,
    }, {
        onError: (error: any) => {
            toast.error(`Failed to fetch accounts: ${error?.message || error}`);
        }
    });

    const initialize = useMutation({
        mutationFn: async (keypair: Keypair) => {
            if (!program) throw new Error('Program is not available')
            return await program.methods
                .initialize()
                .accounts({
                    anaheim: keypair.publicKey,
                })
                .signers([keypair])
                .rpc()
        },
        onSuccess: (tx) => {
            toast.success(`Successfully initialized account: ${tx}`)
            accounts.refetch()
        },
        onError: (error) => {
            toast.error(`Failed to initialize account: ${error.message || error}`)
        },
    })

    return {
        program,
        accounts,
        initialize,
    }
}