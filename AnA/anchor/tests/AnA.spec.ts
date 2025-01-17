import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {AnA} from '../target/types/AnA'

describe('AnA', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.AnA as Program<AnA>

  const AnAKeypair = Keypair.generate()

  it('Initialize AnA', async () => {
    await program.methods
      .initialize()
      .accounts({
        AnA: AnAKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([AnAKeypair])
      .rpc()

    const currentCount = await program.account.AnA.fetch(AnAKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment AnA', async () => {
    await program.methods.increment().accounts({ AnA: AnAKeypair.publicKey }).rpc()

    const currentCount = await program.account.AnA.fetch(AnAKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment AnA Again', async () => {
    await program.methods.increment().accounts({ AnA: AnAKeypair.publicKey }).rpc()

    const currentCount = await program.account.AnA.fetch(AnAKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement AnA', async () => {
    await program.methods.decrement().accounts({ AnA: AnAKeypair.publicKey }).rpc()

    const currentCount = await program.account.AnA.fetch(AnAKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set AnA value', async () => {
    await program.methods.set(42).accounts({ AnA: AnAKeypair.publicKey }).rpc()

    const currentCount = await program.account.AnA.fetch(AnAKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the AnA account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        AnA: AnAKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.AnA.fetchNullable(AnAKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
