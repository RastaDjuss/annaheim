use anchor_lang::prelude::*;

// Post Account Structure
#[account]
pub struct PostAccount {
    pub content: String,
    pub created_at: i64,
}

// Context for Post Creation
#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 512 + 8 // 8 = discriminator, 512 = content size, 8 = created_at
    )]
    pub account: Account<'info, PostAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Function to Create a Post
pub fn create_post(ctx: Context<CreatePost>, content: String) -> Result<()> {
    let post_account = &mut ctx.accounts.account;
    post_account.content = content;
    post_account.created_at = Clock::get()?.unix_timestamp;
    Ok(())
}