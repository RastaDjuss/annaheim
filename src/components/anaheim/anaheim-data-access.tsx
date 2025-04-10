'use client'

import React, { useState } from 'react'
import { useAnaheimProgram } from './hooks/useAnaheimProgram'
import { useAnaheimAccount } from './hooks/useAnaheimAccount'
import {Keypair, PublicKey} from '@solana/web3.js'

export default function AnaheimFeature() {
    const { accounts, initialize } = useAnaheimProgram()
    const [selectedAccount, setSelectedAccount] = useState<PublicKey | null>(null)
    const programAccount = useAnaheimAccount({ account: selectedAccount! })

    const handleInitialize = async () => {
        const newAccount = Keypair.generate() // Generates a new keypair
        await initialize.mutate(newAccount)
        setSelectedAccount(newAccount.publicKey)
    }

    return (
        <div>
            <h1>Anaheim Program</h1>

            {/* Program Accounts */}
            <div className="accounts">
                {Array.isArray(accounts.data) && accounts.data.length ? (
                    <ul>
                        {accounts.data.map((acc: any) => (
                            <li key={acc.publicKey.toString()}>
                                <button onClick={() => setSelectedAccount(acc.publicKey)}>Select: {acc.publicKey.toString()}</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No accounts found</p>
                )}
            </div>

            {/* Initialize New Account */}
            <button onClick={handleInitialize} disabled={initialize.isLoading}>
                {initialize.isLoading ? 'Loading...' : 'Initialize New Account'}
            </button>

            {/* Selected Account */}
            {selectedAccount && (
                <div>
                    <h2>Selected Account: {selectedAccount.toString()}</h2>
                    {!programAccount.accountQuery.data ? (
                        <p>Loading account...</p>
                    ) : (
                        <div>
                            <p>Current Count: {programAccount.accountQuery.data.count}</p>

                            {/* Increment */}
                            <button
                                onClick={() => programAccount.increment.mutate()}
                                disabled={programAccount.increment.status === 'pending'}
                            >
                                {programAccount.increment.status === 'pending' ? 'Incrementing...' : 'Increment'}
                            </button>

                            {/* Decrement */}
                            <button
                                onClick={() => programAccount.decrement.mutate()}
                                disabled={programAccount.decrement.isLoading}
                            >
                                {programAccount.decrementMutation.isLoading ? 'Decrementing...' : 'Decrement'}
                            </button>

                            {/* Set Count */}
                            <button onClick={() => programAccount.setMutation.mutate(5)}>Set Count to 5</button>

                            {/* Close Account */}
                            <button onClick={() => programAccount.closeMutation.mutate()}>Close Account</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}