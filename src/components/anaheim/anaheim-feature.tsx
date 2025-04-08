'use client'

import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { ExplorerLink } from '../cluster/cluster-ui'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { useAnaheimAccounts } from './hooks/useAnaheimAccounts'
import { useAnaheimAccount } from './hooks/useAnaheimAccount'
import { useAnaheimMutations } from './hooks/useAnaheimMutations'

// Keypair import (always include for new account creation):
import { Keypair, PublicKey } from '@solana/web3.js'

export default function AnaheimFeature() {
    const { publicKey } = useWallet()
    const accounts = useAnaheimAccounts()
    const [selectedAccount, setSelectedAccount] = useState<PublicKey | null>(null)
    const { initialize } = useAnaheimMutations(() => accounts.refetch())
    const programAccount = useAnaheimAccount(selectedAccount!)

    const handleInitialize = async () => {
        const newAccount = Keypair.generate()
        await initialize.mutate(newAccount)
        setSelectedAccount(newAccount.publicKey)
    }

    return publicKey ? (
        <div>
            <AppHero
                title="Anaheim Program"
                subtitle={
                    'Create a new account by clicking the "Create" button. The state of an account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
                }
            >
                {accounts.isLoading ? (
                    <p>Loading accounts...</p>
                ) : (
                    <div>
                        <h2>Program Accounts</h2>
                        <ul className="accounts">
                            {accounts.data?.map((acc) => (
                                <li key={acc.publicKey.toString()}>
                                    <button onClick={() => setSelectedAccount(acc.publicKey)}>
                                        {acc.publicKey.toString()}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button onClick={handleInitialize} disabled={initialize?.isLoading}>
                    {initialize?.isLoading ? 'Initializing...' : 'Initialize New Account'}
                </button>

                {selectedAccount && programAccount.accountQuery?.data && (
                    <div>
                        <h2>Account: {selectedAccount.toString()}</h2>
                        <p>Count: {programAccount.accountQuery?.data.count}</p>
                        <button onClick={() => programAccount.increment?.mutate()}>
                            {programAccount.increment?.isLoading ? 'Loading...' : 'Increment'}
                        </button>
                        <button onClick={() => programAccount.decrement?.mutate()}>
                            {programAccount.decrement?.isLoading ? 'Loading...' : 'Decrement'}
                        </button>
                    </div>
                )}
            </AppHero>
        </div>
    ) : (
        <div className="max-w-4xl mx-auto">
            <div className="hero py-[64px]">
                <div className="hero-content text-center">
                    <WalletButton />
                </div>
            </div>
        </div>
    )
}