use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        space = FacebookAccount::LEN,
        seeds = ["self-custodial-facebook2".as_bytes(), signer.key().as_ref()],
        bump,
    )]
    pub facebook_account: Account<'info, FacebookAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        mut,
        seeds = ["self-custodial-facebook2".as_bytes(), signer.key().as_ref()],
        bump = facebook_account.bump,
    )]
    pub facebook_account: Account<'info, FacebookAccount>,
}

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        mut,
        seeds = ["self-custodial-facebook2".as_bytes(), signer.key().as_ref()],
        bump = facebook_account.bump,
        close = signer
    )]
    pub facebook_account: Account<'info, FacebookAccount>,
}