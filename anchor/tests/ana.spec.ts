import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Ana} from '../target/types/ana'

describe('ana', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Ana as Program<Ana>

  const anaKeypair = Keypair.generate()

  it('Initialize Ana', async () => {
    await program.methods
      .initialize()
      .accounts({
        ana: anaKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([anaKeypair])
      .rpc()

    const currentCount = await program.account.ana.fetch(anaKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Ana', async () => {
    await program.methods.increment().accounts({ ana: anaKeypair.publicKey }).rpc()

    const currentCount = await program.account.ana.fetch(anaKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Ana Again', async () => {
    await program.methods.increment().accounts({ ana: anaKeypair.publicKey }).rpc()

    const currentCount = await program.account.ana.fetch(anaKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Ana', async () => {
    await program.methods.decrement().accounts({ ana: anaKeypair.publicKey }).rpc()

    const currentCount = await program.account.ana.fetch(anaKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set ana value', async () => {
    await program.methods.set(42).accounts({ ana: anaKeypair.publicKey }).rpc()

    const currentCount = await program.account.ana.fetch(anaKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the ana account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        ana: anaKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.ana.fetchNullable(anaKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
