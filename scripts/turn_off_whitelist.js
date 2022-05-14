const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.log(MNEMONIC)
  console.log(NODE_API_KEY)
  console.log(OWNER_ADDRESS)
  console.log(NETWORK)
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_state",
        type: "bool",
      },
    ],
    name: "setOnlyWhitelisted",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );
  const web3Instance = new web3(provider);

  if (!FACTORY_CONTRACT_ADDRESS) {
    console.log("missing factory contract address env variable")
  }

  const factoryContract = new web3Instance.eth.Contract(
    FACTORY_ABI,
    FACTORY_CONTRACT_ADDRESS,
    { gasLimit: "1000000" }
  );

  try {
    const result = await factoryContract.methods
        .setOnlyWhitelisted(false)
        .send({ from: OWNER_ADDRESS })
    console.log("Turning off whitelist. Transaction: " + result.transactionHash);
  } catch (e) {
    console.log(e)
  }
}

main();
