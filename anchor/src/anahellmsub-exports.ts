// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import AnahellmsubIDL from '../target/idl/anahellmsub.json'
import type { Anahellmsub } from '../target/types/anahellmsub'

// Re-export the generated IDL and type
export { Anahellmsub, AnahellmsubIDL }

// The programId is imported from the program IDL.
export const ANAHELLMSUB_PROGRAM_ID = new PublicKey(AnahellmsubIDL.address)

// This is a helper function to get the Anahellmsub Anchor program.
export function getAnahellmsubProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...AnahellmsubIDL, address: address ? address.toBase58() : AnahellmsubIDL.address } as Anahellmsub, provider)
}

// This is a helper function to get the program ID for the Anahellmsub program depending on the cluster.
export function getAnahellmsubProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Anahellmsub program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return ANAHELLMSUB_PROGRAM_ID
  }
}
