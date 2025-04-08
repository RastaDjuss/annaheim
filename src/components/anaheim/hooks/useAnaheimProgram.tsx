'use client'

import { getAnaheimProgram, getAnaheimProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { useMemo } from 'react'
import { useCluster } from '@/components/cluster/cluster-data-access'
import { useAnchorProvider } from '@/components/solana/solana-provider'

export function useAnaheimProgram() {
    const { connection } = useConnection()
    const { cluster } = useCluster()
    const provider = useAnchorProvider()

    const programId = useMemo(() => cluster?.network ? getAnaheimProgramId(cluster.network) : undefined, [cluster])
    const program = useMemo(() => getAnaheimProgram(provider, programId), [provider, programId])

    return {
        connection,
        cluster,
        program,
        programId,
    }
}