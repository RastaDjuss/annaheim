#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)]

// Import Anchor framework core library
use anchor_lang::prelude::*;

// Declare your program ID to link this program to the on-chain deployment
declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod anna_heim {
    use super::*;

    pub fn close(_ctx: Context<CloseAnnaHeim>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.anna_heim.count = ctx
            .accounts
            .anna_heim
            .count
            .checked_sub(1)
            .ok_or(ErrorCode::Underflow)?;
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.anna_heim.count = ctx
            .accounts
            .anna_heim
            .count
            .checked_add(1)
            .ok_or(ErrorCode::Overflow)?;
        Ok(())
    }

    pub fn initialize(ctx: Context<InitializeAnnaHeim>) -> Result<()> {
        let anna_heim = &mut ctx.accounts.anna_heim;
        anna_heim.count = 0;
        Ok(())
    }
    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.anna_heim.count = value.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeAnnaHeim<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        space = 8 + AnnaHeim::SPACE,
        payer = payer
    )]
    pub anna_heim: Account<'info, AnnaHeim>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CloseAnnaHeim<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        mut,
        close = payer, // close account and return lamports to payer
    )]
    pub anna_heim: Account<'info, AnnaHeim>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub anna_heim: Account<'info, AnnaHeim>,
}

#[account]
pub struct AnnaHeim {
    pub count: u8,
}

impl AnnaHeim {
    pub const SPACE: usize = 8 + 1; // Account discriminator (8 bytes) + u8 (1 byte)
}

#[error_code]
pub enum ErrorCode {
    #[msg("Operation would result in an integer underflow.")]
    Underflow,
    #[msg("Operation would result in an integer overflow.")]
    Overflow,
}