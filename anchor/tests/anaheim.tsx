import { Program, AnchorProvider, setProvider, workspace, web3 } from "@coral-xyz/anchor";
// Removed export from this definition because Anaheim is already imported as a type in line 7
import {assert, expect } from "chai";
import * as anchor from "@coral-xyz/anchor";
import {Idl} from "@coral-xyz/anchor";

import { Anaheim as AnaheimType } from "../target/types/anaheim"; // Adjust import to match available export from the file.
// Create a Keypair for Anaheim account
import AnaheimIdlJson from "../target/idl/anaheim.json"; // Adjust path to the actual IDL JSON file
const AnaheimIdl: Idl = AnaheimIdlJson as Idl; // Use IDL JSON at runtime
 // Ensure the file exists and is named 'anaheim.tsx' (not .tsx)
import {SystemProgram} from "@solana/web3.js";

const tx = await (workspace.Anaheim as Program<AnaheimType>).methods
    .createUser({ username: "ValidUsername" })
    .accounts({
        user: AnchorProvider.local().wallet.publicKey,
        systemProgram: SystemProgram.programId,
    })
    .rpc();
console.log("Success:", tx);

function before(param: () => Promise<void>) {

}
export type Anaheim = {
    data: number
    authority: string
}
describe("anaheim", () => {
    // Setup the provider and program
    const provider = AnchorProvider.local(); // Use localnet/devnet settings
    setProvider(provider);
    const program = new Program<AnaheimType>(AnaheimIdl as Idl, workspace.Anaheim.programId, provider); // Load the Anaheim program correctly

    let anaheimPubkey: web3.PublicKey; // To store the Anaheim account public key
    let userKeypair = web3.Keypair.generate(); // Generate a new keypair for the tests

    before(async () => {
        // Airdrop some SOL to the user to pay for fees
        const signature = await provider.connection.requestAirdrop(userKeypair.publicKey, web3.LAMPORTS_PER_SOL);
        await provider.connection.confirmTransaction(signature);
    });
    describe("Anaheim Test", () => {
        it("should pass basic validation", () => {
            expect(2 + 2).to.equal(4);
        });

        it("should validate another condition", () => {
            expect("solana").to.include("sol");
        });
    });
    it("Initializes the Anaheim account", async () => {
        anaheimPubkey = anchor.web3.Keypair.generate().publicKey;

        // Send the Initialize transaction
        const tx = await program.methods
            .initializeAnaheim() // Call `initialize_anaheim` handler
            .accounts({
                anaheim: anaheimPubkey,
                user: userKeypair.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([userKeypair])
            .rpc();

        console.log("Transaction signature:", tx);

        // Fetch the account and check initial data
        const anaheimAccount = await (program.account as any).anaheim.fetch(anaheimPubkey);
        assert.strictEqual(anaheimAccount.data.toString(), "0"); // Make sure `data` is initialized to 0
    });

    it("Increments the data field in Anaheim", async () => {
        // Call the increment function
        const tx = await program.methods
            .increment() // Call `increment` method
            .accounts({
                anaheim: anaheimPubkey,
                user: userKeypair.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([userKeypair])
            .rpc();

        console.log("Transaction signature:", tx);

        const anaheimAccount = await program.account.anaheim.fetch(anaheimPubkey);
        assert.strictEqual(anaheimAccount.data.toString(), "1"); // Check if incremented to `1`
    });

    it("Decrements the data field in Anaheim", async () => {
        // Call the decrement function
        const [tx] = await Promise.all([program.methods
            .decrement!() // Call `decrement` method
            .accounts({
                anaheim: anaheimPubkey,
                user: userKeypair.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([userKeypair])
            .rpc()]);

        console.log("Transaction signature:", tx);

        // Fetch the account and check updated data
        const [anaheimAccount] = await Promise.all([program.account.anaheim.fetch(anaheimPubkey)]);
        assert.strictEqual(anaheimAccount.data.toString(), "0"); // Verify it decrements to `0`
    });
    type Anaheim = {
        data: number
        authority: string
    }
});