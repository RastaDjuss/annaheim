// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import AnAIDL from '../target/idl/AnA.json'
import type { AnA } from '../target/types/AnA'

// Re-export the generated IDL and type
export { AnA, AnAIDL }

// The programId is imported from the program IDL.
export const AN_A_PROGRAM_ID = new PublicKey(AnAIDL.address)

// This is a helper function to get the AnA Anchor program.
export function getAnAProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...AnAIDL, address: address ? address.toBase58() : AnAIDL.address } as AnA, provider)
}

// This is a helper function to get the program ID for the AnA program depending on the cluster.
export function getAnAProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the AnA program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return AN_A_PROGRAM_ID
  }
}
