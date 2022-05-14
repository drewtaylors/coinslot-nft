# Execution Plan

# IPFS Upload
1. Upload nft images
2. Upload misc images
3. Update known metadata
4. Update misc metadata
5. Update unknown metdata
6. Upload known metadata
7. Upload unknown metadata
8. Upload known metadata

# Update Contract
1. Update token contract with metadata
2. Update factory contract with metadata

# Deploy Contract
1. Export env variables
2. Deploy contract: `yarn truffle migrate --network rinkeby --reset`
3. Write down factory contract address and token contract address

# Open Sales
1. Ensure env variables: OWNER_ADDRESS, FACTORY_CONTRACT_ADDRESS are set
2. Run `node scripts/intial_sale.js`

# Open Whitelist
1. Ensure env variables: OWNER_ADDRESS, FACTORY_CONTRACT_ADDRESS are set
2. Run `node scripts/whitelist.js`

# Turn off whitelist
1. Ensure env variables: OWNER_ADDRESS, FACTORY_CONTRACT_ADDRESS are set
2. Run `node scripts/turn_off_whitelist.js`

# Reveal
1. Ensure env variables: OWNER_ADDRESS, NFT_CONTRACT_ADDRESS are set
2. Run `node scripts/reveal.js`
