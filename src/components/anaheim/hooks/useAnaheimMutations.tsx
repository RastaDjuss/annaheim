'use client'

import { useMutation } from '@tanstack/react-query'
import { useAnaheimProgram } from './useAnaheimProgram'
import toast from 'react-hot-toast'
import {Keypair, PublicKey} from '@solana/web3.js'
import { useTransactionToast } from '@/components/ui/ui-layout'

export function useAnaheimMutations(refetchAccounts: () => void) {
    const { program, cluster } = useAnaheimProgram()
    const transactionToast = useTransactionToast()

    const initialize = useMutation({
        mutationKey: ['anaheim', 'initialize', { cluster }],
        mutationFn: (keypair: Keypair) =>
            program.methods
                .initialize()
                .accounts({ anaheim: keypair.publicKey })
                .signers([keypair])
                .rpc(),
        onSuccess: (tx) => {
            transactionToast(tx)
            refetchAccounts()
        },
        onError: () => toast.error('Failed to initialize account'),
    })

    const closeAccount = useMutation({
        mutationKey: ['anaheim', 'close', { cluster }],
        mutationFn: (account: PublicKey) =>
            program.methods.close().accounts({ anaheim: account }).rpc(),
        onSuccess: (tx) => {
            transactionToast(tx)
            refetchAccounts()
        },
    })

    return {
        initialize,
        closeAccount,
    }
}