#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
mod core;    // Import core functionality
mod user;    // Import user-related logic
mod post;    // Import post-related logic

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod anaheim {
    use super::*;

    pub fn close(ctx: Context<CloseAnaheim>) -> Result<()> {
        core::close(ctx)
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        core::increment(ctx)
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        core::decrement(ctx)
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        core::set(ctx, value)
    }

    pub fn initialize(ctx: Context<InitializeAnaheim>) -> Result<()> {
        core::initialize(ctx)
    }

    pub fn create_user(ctx: Context<CreateUser>, username: String) -> Result<()> {
        user::create_user(ctx, username)
    }

    pub fn create_post(ctx: Context<CreatePost>, content: String) -> Result<()> {
        post::create_post(ctx, content)
    }
}