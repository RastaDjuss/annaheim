import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Anaheim } from '../target/types/anaheim'; // Adjust path as needed
import { Keypair } from '@solana/web3.js';
import * as dotenv from "dotenv";
dotenv.config();
export default {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    setupFiles: ["dotenv/config"],
};
describe('Anaheim Tests', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const payer = provider.wallet as anchor.Wallet;
  const program = anchor.workspace.Anaheim as Program<Anaheim>;

  const anaheimKeypair = Keypair.generate();

  it('Increment Anaheim', async () => {
    await program.methods.increment!()
        .accounts({
          anaheim: anaheimKeypair.publicKey,
        })
        .rpc();

        const currentCount = await (program.account as any).anaheim.fetch(anaheimKeypair.publicKey);
    expect(currentCount.count).toEqual(1);
  });

  it('Decrement Anaheim', async () => {
    await program.methods.decrement()
        .accounts({
          anaheim: anaheimKeypair.publicKey,
        })
        .rpc();

    const currentCount = await (program.account as any).anaheim.fetch(anaheimKeypair.publicKey);
    expect(currentCount.count).toEqual(0);
  });

  it('Set Anaheim Value', async () => {
    await (program.methods as any).set(new anchor.BN(42)) // Use 'set' as defined in Rust
        .accounts({
          anaheim: anaheimKeypair.publicKey,
        })
        .rpc();

    const currentCount = await program.account.anaheim.fetch(anaheimKeypair.publicKey);
    expect(currentCount.count).toEqual(42);
  });

  it('Close Anaheim Account', async () => {
    await program.methods.closeAccount()
        .accounts({
          payer: payer.publicKey,
          anaheim: anaheimKeypair.publicKey,
        })
        .rpc();

    const closedAccount = await program.account.anaheim.fetchNullable(anaheimKeypair.publicKey);
    expect(closedAccount).toBeNull();
  });
});