// use this import to gain access to common anchor features
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use solana_program::pubkey::Pubkey;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct MyStruct {
    /// Token pubkey.
    #[serde(with = "pubkey")]
    pub address: Pubkey,
}
// Declare an address for your program a.k.a smart contract
declare_id!("ThSq9qsRs6c6kBRrLJngezihMUgL86MdiDs4wNUi2F8");

entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!(
        "process_instruction: {}: {} accounts, data={:?}",
        program_id,
        accounts.len(),
        instruction_data
    );
    if instruction_data.is_empty() {
        msg!("instruction_data is empty. Exiting early.");
        return Ok(());
    }
    msg!("Instruction data received: {:?}", instruction_data);

    // Check if first byte is 1, process as a special instruction
    if instruction_data[0] == 1 {
        msg!("Special instruction detected.");
        // Add your custom logic here for special instruction
        if let Some(second_byte) = instruction_data.get(1) {
            match second_byte {
                1 => msg!("Handling subtype 1 within the special instruction."),
                2 => msg!("Handling subtype 2 within the special instruction."),
                _ => msg!("Unknown subtype within the special instruction."),
            }
        } else {
            msg!("No subtype specified in special instruction.");
        }
    }

    Ok(())
}

#[cfg(test)]
mod test {
    use self::{
        super::*,
        assert_matches::*,
        solana_program::instruction::{AccountMeta, Instruction, account_info::AccountInfo, entrypoint, InstructionError, ProgramResult, Pubkey, msg},
        solana_program_test::*,
        solana_sdk::{signature::Signer, transaction::Transaction},
    };

    #[tokio::test]
    async fn test_transaction() {
        let program_id = Pubkey::new_unique();

        let (mut banks_client, payer, recent_blockhash) = ProgramTest::new(
            "bpf_program_template",
            program_id,
            processor!(process_instruction),
        )
            .start()
            .await;

        let mut transaction = Transaction::new_with_payer(
            &[Instruction {
                program_id,
                accounts: vec![AccountMeta::new(payer.pubkey(), false)],
                data: vec![1, 2, 3],
            }],
            Some(&payer.pubkey()),
        );
        transaction.sign(&[&payer], recent_blockhash);

        assert_matches!(banks_client.process_transaction(transaction).await, Ok(()));
    }

    #[tokio::test]
    async fn test_special_instruction() {
        let program_id = Pubkey::new_unique();

        let (mut banks_client, payer, recent_blockhash) = ProgramTest::new(
            "bpf_program_template",
            program_id,
            processor!(process_instruction),
        )
            .start()
            .await;

        let mut transaction = Transaction::new_with_payer(
            &[Instruction {
                program_id,
                accounts: vec![AccountMeta::new(payer.pubkey(), false)],
                data: vec![1, 1],
            }],
            Some(&payer.pubkey()),
        );
        transaction.sign(&[&payer], recent_blockhash);

        assert_matches!(banks_client.process_transaction(transaction).await, Ok(()));
    }

    #[tokio::test]
    async fn test_unknown_subtype() {
        let program_id = Pubkey::new_unique();

        let (mut banks_client, payer, recent_blockhash) = ProgramTest::new(
            "bpf_program_template",
            program_id,
            processor!(process_instruction),
        )
            .start()
            .await;

        let mut transaction = Transaction::new_with_payer(
            &[Instruction {
                program_id,
                accounts: vec![AccountMeta::new(payer.pubkey(), false)],
                data: vec![1, 3],
            }],
            Some(&payer.pubkey()),
        );
        transaction.sign(&[&payer], recent_blockhash);

        assert_matches!(banks_client.process_transaction(transaction).await, Ok(()));
    }
}
// write your business logic here
#[program]
pub mod hello_world {
    use super::*;
    pub fn hello_world(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello world, from solana smart contract");
        Ok(())
    }
}

