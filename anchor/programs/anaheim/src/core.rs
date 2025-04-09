use anchor_lang::prelude::*;


#[program]
pub mod anaheim {
    use super::*;

    pub fn initialize(ctx: Context<InitializeAnaheim>) -> Result<()> {
        let anaheim = &mut ctx.accounts.anaheim;
        anaheim.data = 0;
        Ok(())
    }

    pub fn close(ctx: Context<CloseAnaheim>) -> Result<()> {
        core::close(ctx)
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        core::increment(ctx)
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        core::decrement(ctx)
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        core::set(ctx, value)
    }
}

// Main Anaheim account
#[account]
pub struct Anaheim {
    pub data: u64, // Represents the state of Anaheim
}

// Context for initializing `Anaheim`
#[derive(Accounts)]
pub struct InitializeAnaheim<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8 // 8 bytes discriminator + 8 bytes for data
    )]
    pub anaheim: Account<'info, Anaheim>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Context for closing the `Anaheim` account
#[derive(Accounts)]
pub struct CloseAnaheim<'info> {
    #[account(mut, close = user)] // Closing the Anaheim account refunds lamports to user
    pub anaheim: Account<'info, Anaheim>,
    #[account(mut)]
    pub user: Signer<'info>,
}

// Context for updating the `Anaheim` account
#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub anaheim: Account<'info, Anaheim>, // The Anaheim account being updated
    #[account(mut)]
    pub user: Signer<'info>, // The signer making the update
    pub system_program: Program<'info, System>,
}