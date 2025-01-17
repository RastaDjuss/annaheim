'use client'

import { getAnAProgram, getAnAProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useAnAProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getAnAProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getAnAProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['AnA', 'all', { cluster }],
    queryFn: () => program.account.AnA.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['AnA', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ AnA: keypair.publicKey }).signers([keypair]).rpc(),
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

export function useAnAProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useAnAProgram()

  const accountQuery = useQuery({
    queryKey: ['AnA', 'fetch', { cluster, account }],
    queryFn: () => program.account.AnA.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['AnA', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ AnA: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['AnA', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ AnA: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['AnA', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ AnA: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['AnA', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ AnA: account }).rpc(),
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
