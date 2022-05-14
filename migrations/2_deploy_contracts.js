const Lex = artifacts.require("./Lex.sol");
const LexFactory = artifacts.require("./LexFactory.sol");

// If you want to hardcode what deploys, comment out process.env.X and use
// true/false;
const DEPLOY_LEXS_SALE = true;
const DEPLOY_LEXS = true;

module.exports = async (deployer, network, addresses) => {
  // OpenSea proxy registry addresses for rinkeby and mainnet.
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0x1e525eeaf261ca41b809884cbde9dd9e1619573a";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  if (DEPLOY_LEXS) {
    await deployer.deploy(Lex, proxyRegistryAddress, {gas: 5000000});
  }

  if (DEPLOY_LEXS_SALE) {
    await deployer.deploy(LexFactory, proxyRegistryAddress, Lex.address, {gas: 7000000});
    const lex = await Lex.deployed();
    await lex.linkFactory(LexFactory.address);
  }
};
