use anchor_lang::prelude::*;
use crate::Anaheim;

pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.anaheim.count = ctx.accounts.anaheim.count.checked_add(1).unwrap();
    Ok(())
}

pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.anaheim.count = ctx.accounts.anaheim.count.checked_sub(1).unwrap();
    Ok(())
}

pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.anaheim.count = value;
    Ok(())
}

pub fn initialize(_ctx: Context<InitializeAnaheim>) -> Result<()> {
    Ok(())
}

pub fn close(_ctx: Context<CloseAnaheim>) -> Result<()> {
    Ok(())
}