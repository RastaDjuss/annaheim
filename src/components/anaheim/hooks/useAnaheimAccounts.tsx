'use client'

import { useQuery } from '@tanstack/react-query'
import { useAnaheimProgram } from './useAnaheimProgram'

export function useAnaheimAccounts() {
    const { program, cluster } = useAnaheimProgram()

    const accounts = useQuery({
        queryKey: ['anaheim', 'all', { cluster }],
        queryFn: () => program.account.anaheim.all(),
    })

    return accounts
}