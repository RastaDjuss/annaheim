'use client'

import { getAnahellmsubProgram, getAnahellmsubProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useAnahellmsubProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getAnahellmsubProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getAnahellmsubProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['anahellmsub', 'all', { cluster }],
    queryFn: () => program.account.anahellmsub.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['anahellmsub', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ anahellmsub: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useAnahellmsubProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useAnahellmsubProgram()

  const accountQuery = useQuery({
    queryKey: ['anahellmsub', 'fetch', { cluster, account }],
    queryFn: () => program.account.anahellmsub.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['anahellmsub', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ anahellmsub: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['anahellmsub', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ anahellmsub: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['anahellmsub', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ anahellmsub: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['anahellmsub', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ anahellmsub: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
