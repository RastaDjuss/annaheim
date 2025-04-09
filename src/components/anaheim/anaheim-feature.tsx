'use client'

import React, { useState } from 'react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useAnaheimProgram } from './hooks/useAnaheimProgram'
import { useAnaheimMutations } from './hooks/useAnaheimMutations'
import { useAccountQuery } from './hooks/useAccountQuery'

export default function AnaheimFeature() {
    const [selectedAccount, setSelectedAccount] = useState<PublicKey | null>(null)

// Fetching accounts and initializing accounts.
    const { accounts: accountsQuery, initialize } = useAnaheimProgram() as unknown as {
        accounts: {
            isLoading: boolean;
            data?: Array<{ publicKey: PublicKey }>;
        };
        initialize: any;
    }

// Query to fetch account data of the selected account.
    const { data: accountData, isLoading: accountLoading } = useAccountQuery(selectedAccount ?? undefined)

// Mutations for selected account actions (increment, decrement, etc.).
    const { incrementMutation, decrementMutation, setMutation, closeMutation } = useAnaheimMutations(selectedAccount)
    const handleInitialize = async () => {
        const newKeypair = Keypair.generate()
        initialize.mutate(newKeypair)
        setSelectedAccount(newKeypair.publicKey)
    }

    return (
        <div>
            <h1>Anaheim Feature</h1>

            {/* Initialize Button */}
            <button onClick={handleInitialize}>Initialize Account</button>

            {/* Display All Accounts */}
            {accountsQuery?.isLoading ? (
                <p>Loading accounts...</p>
            ) : (
                <ul>
                    {accountsQuery.data?.map((account) => (
                        <li key={account.publicKey.toBase58()}>
                            <button onClick={() => setSelectedAccount(account.publicKey)}>
                                {account.publicKey.toBase58() || 'N/A'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Display Selected Account */}
            {selectedAccount && (
                <section>
                    <h2>Selected Account: {selectedAccount.toBase58()}</h2>
                    {accountLoading ? (
                        <p>Loading account data...</p>
                    ) : (
                        accountData && (
                            <div>
                                <p>Current Count: {accountData.count}</p>

                                <button onClick={() => incrementMutation.mutate()}>Increment</button>
                                <button onClick={() => decrementMutation.mutate()}>Decrement</button>
                                <button onClick={() => setMutation.mutate(5)}>Set Count to 5</button>
                                <button onClick={() => closeMutation.mutate()}>Close Account</button>
                            </div>
                        )
                    )}
                </section>
            )}
        </div>
    )
}