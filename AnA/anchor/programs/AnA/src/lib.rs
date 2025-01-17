#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod AnA {
    use super::*;

  pub fn close(_ctx: Context<CloseAnA>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.AnA.count = ctx.accounts.AnA.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.AnA.count = ctx.accounts.AnA.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeAnA>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.AnA.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeAnA<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + AnA::INIT_SPACE,
  payer = payer
  )]
  pub AnA: Account<'info, AnA>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseAnA<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub AnA: Account<'info, AnA>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub AnA: Account<'info, AnA>,
}

#[account]
#[derive(InitSpace)]
pub struct AnA {
  count: u8,
}
