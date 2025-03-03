use anchor_lang::prelude::*;

pub mod accounts;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("8vBaXtoP9dBt97jA9FQz9NyuchRpFWEuiLxLLj7MYbnQ");

#[program]
pub mod self_custodial_facebook {
    use super::*;

    pub fn create_facebook(
        ctx: Context<accounts::Initialize>,
        name: String,
        status: String,
        twitter: String,
    ) -> Result<()> {
        instructions::create_facebook(ctx, name, status, twitter)
    }

    pub fn update_status(
        ctx: Context<accounts::Update>,
        new_status: String,
    ) -> Result<()> {
        instructions::update_status(ctx, new_status)
    }

    pub fn delete_account(ctx: Context<accounts::Close>) -> Result<()> {
        instructions::delete_account(ctx)
    }
}