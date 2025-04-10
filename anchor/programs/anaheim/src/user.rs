use anchor_lang::prelude::*;

// User Account Structure
#[account]
pub struct UserAccount {
    pub username: String,
    pub created_at: i64,
}

// Context for User Account Creation
#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 // 8 = discriminator, 32 = username (max length), 8 = created_at
    )]
    pub account: Account<'info, UserAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Function to Create a User
pub fn create_user(ctx: Context<CreateUser>, username: String) -> Result<()> {
    let user_account = &mut ctx.accounts.account;
    user_account.username = username;
    user_account.created_at = Clock::get()?.unix_timestamp;
    Ok(())
}