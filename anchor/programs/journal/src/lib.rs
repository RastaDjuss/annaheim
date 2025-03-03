use anchor_lang::prelude::*;
use anchor_lang::solana_program::pubkey::Pubkey; // Fixed import for Pubkey
use borsh::{BorshSerialize, BorshDeserialize}; // Removed unused imports

#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
struct A {
    x: u64,
    y: String,
}

#[test]
fn test_simple_struct() {
    let a = A {
        x: 3301,
        y: "liber primus".to_string(),
    };
    let encoded_a = a.try_to_vec().unwrap(); // Changed to `try_to_vec` method
    let decoded_a = A::try_from_slice(&encoded_a).unwrap(); // Changed to `try_from_slice` method
    assert_eq!(a, decoded_a);
}

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("94L2mJxVu6ZMmHaGsCHRQ65Kk2mea6aTnwWjSdfSsmBC");

#[program]
pub mod journal {
    use super::*;

    pub fn create_journal_entry(
        ctx: Context<CreateEntry>,
        title: String,
        message: String,
    ) -> Result<()> {
        msg!("Journal Entry Created");
        msg!("Title: {}", title);
        msg!("Message: {}", message);

        let journal_entry = &mut ctx.accounts.journal_entry;
        journal_entry.owner = ctx.accounts.owner.key();
        journal_entry.title = title;
        journal_entry.message = message;
        Ok(())
    }

    pub fn update_journal_entry(
        ctx: Context<UpdateEntry>,
        title: String,
        message: String,
    ) -> Result<()> {
        msg!("Journal Entry Updated");
        msg!("Title: {}", title);
        msg!("Message: {}", message);

        let journal_entry = &mut ctx.accounts.journal_entry;
        journal_entry.title = title; // Title is now updated along with the message
        journal_entry.message = message;

        Ok(())
    }

    pub fn delete_journal_entry(ctx: Context<DeleteEntry>, title: String) -> Result<()> {
        msg!("Journal entry titled {} deleted", title);

        // Remove any potential side-effects if additional cleanup logic is needed
        let _journal_entry = &mut ctx.accounts.journal_entry;

        Ok(())
    }
}

#[account]
pub struct JournalEntryState {
    pub owner: Pubkey,
    pub title: String,
    pub message: String,
}

#[derive(Accounts)]
#[instruction(title: String, message: String)]
pub struct CreateEntry<'info> {
    #[account(
        init,
        seeds = [b"entry", title.as_bytes(), owner.key().as_ref()], 
        bump, 
        payer = owner, 
        space = 8 + 32 + 4 + title.len() + 4 + message.len()
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String, message: String)]
pub struct UpdateEntry<'info> {
    #[account(
        mut,
        seeds = [b"entry", journal_entry.title.as_bytes(), owner.key().as_ref()], 
        bump,
        realloc = 8 + 32 + 4 + title.len() + 4 + message.len(),
        realloc::payer = owner, 
        realloc::zero = true,
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct DeleteEntry<'info> {
    #[account( 
        mut, 
        seeds = [b"entry", journal_entry.title.as_bytes(), owner.key().as_ref()], 
        bump, 
        close = owner,
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
