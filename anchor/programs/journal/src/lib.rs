use anchor_lang::prelude::*;
use anchor_lang::solana_program::hash;
use anchor_lang::prelude::Pubkey;
use crate::Pubkey;

// automatically when you build the project.
declare_id!("94L2mJxVu6ZMmHaGsCHRQ65Kk2mea6aTnwWjSdfSsmBC");

#[program]
mod journal {
    pub struct HeapDefault;
    use anchor_lang::solana_program::hash::hash;
    pub fn generate_seeds(title: &str, owner: &Pubkey) -> Vec<u8> {
        let title_seed = hash(title.as_bytes()).to_bytes();
        [b"entry".as_ref(), &title_seed, owner.as_ref()].concat()
    }
}
pub use journal::*;

mod heap_default {
    pub struct HeapDefault;
}

