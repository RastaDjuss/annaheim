'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useAnaheimProgram } from './useAnaheimProgram'
import { PublicKey } from '@solana/web3.js'
import toast from 'react-hot-toast'
import { useTransactionToast } from '@/components/ui/ui-layout'

export function useAnaheimAccount(account: { account: PublicKey }) {
    const { program, cluster } = useAnaheimProgram()
    const transactionToast = useTransactionToast()

    const accountQuery = useQuery({
        queryKey: ['anaheim', 'fetch', { cluster, account }],
        queryFn: () => program.account.anaheim.fetch(account),
    })

    const increment = useMutation({
        mutationKey: ['anaheim', 'increment', { cluster, account }],
        mutationFn: () => program.methods.increment().accounts({ anaheim: account }).rpc(),
        onSuccess: (tx) => {
            transactionToast(tx)
            return accountQuery.refetch()
        },
        onError: () => toast.error('Failed to increment count'),
    })

    const decrement = useMutation({
        mutationKey: ['anaheim', 'decrement', { cluster, account }],
        mutationFn: () => program.methods.decrement().accounts({ anaheim: account }).rpc(),
        onSuccess: (tx) => {
            transactionToast(tx)
            return accountQuery.refetch()
        },
        onError: () => toast.error('Failed to decrement count'),
    })

    return {
        accountQuery,
        increment,
        decrement,
    }
}