// use this import to gain access to common anchor features
use anchor_lang::prelude::*;
// Declare an address for your program a.k.a smart contract
declare_id!("ThSq9qsRs6c6kBRrLJngezihMUgL86MdiDs4wNUi2F8");

// write your business logic here
#[program]
pub mod hello_world {
    use super::*;
    pub fn hello_world(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello world, the Chotic Fractal putsch Attracto and AnarCoin Collective Putsch");
        Ok(())
    }
}

// validate incoming accounts here
#[derive(Accounts)]
pub struct Initialize {}
