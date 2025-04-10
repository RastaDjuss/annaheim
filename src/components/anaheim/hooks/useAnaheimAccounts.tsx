import { useQuery } from '@tanstack/react-query'
import { Connection, PublicKey } from '@solana/web3.js'
import { useAnaheimProgram } from './useAnaheimProgram'

export function useAnaheimAccounts(accountKey?: PublicKey) {
    const { connection, program } = useAnaheimProgram()

    // Fetch account data using React Query
    const { data: accountData, isLoading, error } = useQuery({
        queryKey: ['anaheimAccounts', accountKey?.toBase58()], // Keyed query
        queryFn: async () => {
            if (!connection || !accountKey) throw new Error('Invalid connection or account key')

            const accountInfo = await connection.getAccountInfo(accountKey) // Fetch account info
            if (!accountInfo) throw new Error(`Account ${accountKey.toBase58()} not found`)

            return accountInfo
        },
        enabled: Boolean(accountKey), // Only run if accountKey is provided
    })

    return { accountData, isLoading, error }
}