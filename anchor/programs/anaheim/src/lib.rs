use anchor_lang::prelude::*;
use crate::core::initialize;

// Declare the Program ID
declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

// Main module containing the program
#[program]
pub mod anaheim {
    use super::*;

    // Initialize Anaheim
    pub fn initialize_anaheim(ctx: Context<InitializeAnaheim>) -> Result<()> {
        initialize(ctx) // Call core logic to initialize Anaheim
    }

    // Create a User Account
    pub fn create_user(ctx: Context<CreateUser>, username: String) -> Result<()> {
        if username.len() > 32 {
            return Err(ErrorCode::InvalidUsernameLength.into());
        }
        msg!("Creating user with username: {}", username);
        Ok(())
    }

    // Create a Post
    pub fn create_post(ctx: Context<CreatePost>, content: String) -> Result<()> {
        if content.is_empty() {
            return Err(ErrorCode::EmptyPostContent.into());
        }
        msg!("Creating post with content: {}", content);
        Ok(())
    }
}

// Core logic module
pub mod core {
    use anchor_lang::prelude::*;
    use crate::InitializeAnaheim;

    // Shared logic for initializing Anaheim
    pub fn initialize(ctx: Context<InitializeAnaheim>) -> Result<()> {
        msg!("Anaheim initialization logic called.");
        Ok(())
    }
}

// Anaheim Main Account
#[account]
pub struct Anaheim {
    pub data: u64, // Represents the state of Anaheim
}

// Context: Initialize Anaheim Account
#[derive(Accounts)]
pub struct InitializeAnaheim<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8 // 8 bytes discriminator + 8 bytes for data
    )]
    pub anaheim: Account<'info, Anaheim>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Context: Close Anaheim Account
#[derive(Accounts)]
pub struct CloseAnaheim<'info> {
    #[account(mut, close = user)]
    pub anaheim: Account<'info, Anaheim>, // Closing the Anaheim account refunds lamports to user
    #[account(mut)]
    pub user: Signer<'info>,
}

// Context: Update Anaheim Account
#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub anaheim: Account<'info, Anaheim>, // The Anaheim account being updated
    #[account(mut)]
    pub user: Signer<'info>, // The signer making the update
    pub system_program: Program<'info, System>,
}

// Context: Create User Account
#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Context: Create Post
#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Error definitions for the program
#[error_code]
pub enum ErrorCode {
    #[msg("Anaheim data overflow error.")]
    DataOverflow,
    #[msg("Invalid username length.")]
    InvalidUsernameLength,
    #[msg("Post content is empty.")]
    EmptyPostContent,
}