// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import AnaIDL from '../target/idl/ana.json'
import type { Ana } from '../target/types/ana'

// Re-export the generated IDL and type
export { Ana, AnaIDL }

// The programId is imported from the program IDL.
export const ANA_PROGRAM_ID = new PublicKey(AnaIDL.address)

// This is a helper function to get the Ana Anchor program.
export function getAnaProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...AnaIDL, address: address ? address.toBase58() : AnaIDL.address } as Ana, provider)
}

// This is a helper function to get the program ID for the Ana program depending on the cluster.
export function getAnaProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Ana program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return ANA_PROGRAM_ID
  }
}
