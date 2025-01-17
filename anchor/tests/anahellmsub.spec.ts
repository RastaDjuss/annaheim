import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Anahellmsub} from '../target/types/anahellmsub'

describe('anahellmsub', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Anahellmsub as Program<Anahellmsub>

  const anahellmsubKeypair = Keypair.generate()

  it('Initialize Anahellmsub', async () => {
    await program.methods
      .initialize()
      .accounts({
        anahellmsub: anahellmsubKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([anahellmsubKeypair])
      .rpc()

    const currentCount = await program.account.anahellmsub.fetch(anahellmsubKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Anahellmsub', async () => {
    await program.methods.increment().accounts({ anahellmsub: anahellmsubKeypair.publicKey }).rpc()

    const currentCount = await program.account.anahellmsub.fetch(anahellmsubKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Anahellmsub Again', async () => {
    await program.methods.increment().accounts({ anahellmsub: anahellmsubKeypair.publicKey }).rpc()

    const currentCount = await program.account.anahellmsub.fetch(anahellmsubKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Anahellmsub', async () => {
    await program.methods.decrement().accounts({ anahellmsub: anahellmsubKeypair.publicKey }).rpc()

    const currentCount = await program.account.anahellmsub.fetch(anahellmsubKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set anahellmsub value', async () => {
    await program.methods.set(42).accounts({ anahellmsub: anahellmsubKeypair.publicKey }).rpc()

    const currentCount = await program.account.anahellmsub.fetch(anahellmsubKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the anahellmsub account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        anahellmsub: anahellmsubKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.anahellmsub.fetchNullable(anahellmsubKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
