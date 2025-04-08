use anchor_lang::prelude::*;

#[account]
pub struct User {
    pub username: String,
    pub created_at: i64,
}

pub fn create_user(ctx: Context<CreateUser>, username: String) -> Result<()> {
    let user = &mut ctx.accounts.user;
    user.username = username;
    user.created_at = Clock::get()?.unix_timestamp;
    Ok(())
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init,
        payer = payer,
        space = 8 + 32 + 8 // Space for username and timestamp
    )]
    pub user: Account<'info, User>,
    pub system_program: Program<'info, System>,
}