use anchor_lang::prelude::*;

#[account]
pub struct Post {
    pub author: Pubkey,
    pub content: String,
    pub created_at: i64,
}

pub fn create_post(ctx: Context<CreatePost>, content: String) -> Result<()> {
    let post = &mut ctx.accounts.post;
    post.author = *ctx.accounts.authority.key;
    post.content = content;
    post.created_at = Clock::get()?.unix_timestamp;
    Ok(())
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 280 + 8 // Space for author, content (280), timestamp
    )]
    pub post: Account<'info, Post>,
    pub system_program: Program<'info, System>,
}