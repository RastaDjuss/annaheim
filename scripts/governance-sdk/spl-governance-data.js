// Fetch all Realms accounts (v2)
const realms = await splGovernance.getAllRealms()

// Fetch proposal from its public key
const proposalAddress = new PublicKey("4HxrP3R6A6GcUv62VHG331gwJKNhrqHKF438oRztzz2r")
const proposal = await splGovernance.getProposalByPubkey(proposalAddress)