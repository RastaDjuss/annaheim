use anchor_lang::prelude::*;

#[account]
pub struct FacebookAccount {
    pub authority: Pubkey,
    pub bump: u8,
    pub name: String,
    pub status: String,
    pub twitter: String,
}

impl FacebookAccount {
    pub const LEN: usize = 8 + // discriminator
        32 + // Pubkey
        1 +  // bump
        (4 + 10) + // 10 chars of Name
        (4 + 100) + // 100 chars of Status
        (4 + 10); // 10 chars of Twitter
}