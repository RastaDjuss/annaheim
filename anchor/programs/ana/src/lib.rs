#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod ana {
  use super::*;

  pub fn close(_ctx: Context<CloseAna>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.ana.count = ctx.accounts.ana.count.checked_sub(1).ok_or_else(|| error!(AnaError::Underflow))?;
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.ana.count = ctx.accounts.ana.count.checked_add(1).ok_or_else(|| error!(AnaError::Overflow))?;
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeAna>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.ana.count = value;
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeAna<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Ana::INIT_SPACE,
  payer = payer
  )]
  pub ana: Account<'info, Ana>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseAna<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub ana: Account<'info, Ana>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub ana: Account<'info, Ana>,
}

#[account]
#[derive(InitSpace)]
pub struct Ana {
  count: u8,
}

#[error_code]
pub enum AnaError {
  Underflow,
  Overflow,
}
