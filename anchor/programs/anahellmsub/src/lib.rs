#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod anahellmsub {
    use super::*;

  pub fn close(_ctx: Context<CloseAnahellmsub>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.anahellmsub.count = ctx.accounts.anahellmsub.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.anahellmsub.count = ctx.accounts.anahellmsub.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeAnahellmsub>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.anahellmsub.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeAnahellmsub<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Anahellmsub::INIT_SPACE,
  payer = payer
  )]
  pub anahellmsub: Account<'info, Anahellmsub>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseAnahellmsub<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub anahellmsub: Account<'info, Anahellmsub>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub anahellmsub: Account<'info, Anahellmsub>,
}

#[account]
#[derive(InitSpace)]
pub struct Anahellmsub {
  count: u8,
}
