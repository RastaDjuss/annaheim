use anchor_lang::prelude::*;
use crate::accounts::*;
use crate::state::*;

pub fn create_facebook(
    ctx: Context<Initialize>,
    name: String,
    status: String,
    twitter: String,
) -> Result<()> {
    let users_account_data = &mut ctx.accounts.facebook_account;
    users_account_data.bump = ctx.bumps.facebook_account;
    users_account_data.authority = *ctx.accounts.signer.key;
    users_account_data.name = name.to_owned();
    users_account_data.status = status.to_owned();
    users_account_data.twitter = twitter.to_owned();

    msg!(
        "Created a new account with the following details:
        Name: {}
        Status: {}
        Twitter: {}",
        name, status, twitter
    );

    Ok(())
}

pub fn update_status(ctx: Context<Update>, new_status: String) -> Result<()> {
    msg!(
        "Updating status from {} to {}",
        &ctx.accounts.facebook_account.status,
        &new_status
    );
    ctx.accounts.facebook_account.status = new_status;

    Ok(())
}

pub fn delete_account(_ctx: Context<Close>) -> Result<()> {
    msg!("Account Closed successfully");
    Ok(())
}