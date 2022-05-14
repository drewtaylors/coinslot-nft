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
        name: "_users",
        type: "address[]"
      },
    ],
    name: "whitelistUsers",
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
    console.log("missing environment variable FACTORY_CONTRACT_ADDRESS")
  }

  const factoryContract = new web3Instance.eth.Contract(
    FACTORY_ABI,
    FACTORY_CONTRACT_ADDRESS,
    { gasLimit: "10000000" }
  );

  let addresses = [
    "0xf5b8ee903726c70883b30B569f16c4a7113C53aE",
    "0x060833a5F8c613cB64D7357cEac4303d161b556f",
    "0x05dca02Bd445C5A2e000C0bA74dbb9fbEa4B8426",
    "0x6e7a0F5779c37D4dD299ece3439899D4f0cE9334",
    "0x8CF901805656bF52c11e09eCB0921a7972DDEeEa",
    "0xb94c414b5ad89fB9EC991Df21Ec154e58FC53391",
    "0xA743F17Dc850E4B8a838851B0f118C3E89691A3C",
    "0x9ab96F9E04593e73d7e6833f6aDEAb79c2B6fD30",
    "0x337e70eFF610883A5DE7FCd5F49D1070Eb72ee38",
    "0xEe65F39b2e85ddd27DEA637114dFF9FF45c6737d",
    "0xE9BDDa16851f189a526A1644c20B2EB518c42377",
    "0x29719A539FAD6488E278EDeCaDa21c6a8381a585",
    "0xd100F9C808239DeA6bF73472215991917a4d6385",
    "0x955f46269dc65711fB4465FBA5716487a8B2229f",
    "0xA54C11e88dD011fDcd85d605EE99ebF4De33c4f8",
    "0x222a3c8F9c174d3069988C531fEEA0F266dedE27",
    "0x71170f13A11FD01657dB5a4e8fF6FCF122f2bf1C",
    "0xfec8af52737ab4de7ce0ea3e1c1a7044a6fb2bd5",
    "0xf972578225c13B2aD27e8cB08241B4E09e74b4Fa",
    "0x39D25193d2Eb8Ce00F19819F98dFD5951565c4F6",
    "0x9Eab56F83FA2B80f2464dFA43154741C46eFe447",
    "0x2c969A10e1F2896aD82D6fDF011d160D5f3A61Ac",
    "0x58867fA928B92Ca3dC1c709d058Ea1bfa1FC28d5",
    "0x528BBd338250Cda97fC652f5bFA0ECe3057952E8",
    "0x71a9a4a74cC6EC04e453E2dB8C9B575E16bF4Ab7",
    "0xAB5dEAe40e598e344284B618A501a3bF669DB9ed",
    "0xa7dD4310102B71bEB4a1928D7ce95360a291e46A",
    "0xF9D4F4EA5E589Ac3Ec2bE2b34dCaD6fB412C1550",
    "0x03Fe06352BB20841269AFe58B72409Dd5e5521e3",
    "0x522aF749D5e1ad1E00AbA50C90aFa111509171e6",
    "0xAB5dEAe40e598e344284B618A501a3bF669DB9ed",
    "0x563e3942996aab8a2f897b301b0ddc1ee4ce4d3d",
    "0x40f594d6e2e26cb7a86c0013509b8d12d7ee7ae0",
    "0x1ea0019152B786Fb0825ee7c6d8a33e5198215C6",
    "0xF175371aB16950a4eA57eCFdcccC586714D97c71",
    "0xa34e31Fb32a135382f5ABEa857E78aF78AAE8Ccd",
    "0x93AD2C6c546ec85F2Ff2A5467771A6e431B6670B",
    "0xdfE8930561Fa23de2755080a096B0711dC63C792",
    "0x3109333b09cf2f5ce82c6c71560558b4791166bd",
    "0xdF4033F6D03B24EeA014f5649CEd0E4dadc9445B",
    "0x8c80a73DaB44cE06aA7c430Cc74569416Bb8Ce75",
    "0x42005417AB57ED156376916A6d9Ddb70A4e0d3e5",
    "0xDDf0Ad39b90f263944bFA8483e87C14E4028C5Ab",
    "0xB9d95e25a43372CdDfc161933a884cAF71242695",
    "0x7FfCd02C3d6BA55dbE05A6b6CEa40a1665e9829B",
    "0x846CE6f5C68eb28303af9f2234Ee635F8127D1C3",
    "0x1EA04D586C4D4B964b4Aece2C59eC5f5A27e8cFc",
    "0xD8A73421fE413969345b4061703574E920d95528",
    "0xCCf59a1216dc5bA0005E44c7466bC2756e8bdD8B",
    "0xe57CC8c0d04Bb36f82B0344673DEC642069Bf620",
    "0xB14be4727d23C36Ec10BfbAf4b07C683a987daDA",
    "0x7D9a660E54dcC51358671c485CD5Ab8eefde2429",
    "0xB326F137A32aE7ff1E9B1e7FA21b42D672B5b85c",
    "0x0a4421fbb7b2177d07b0c624af73ea81df8e10d3",
    "0x755d1A5Ff4bcF1577A7e052d7cF844463cb8D309",
    "0xbe1e5fE7D88099Ee897314509eCAc133270F081c",
    "0x42f0aa1094a4e903669b7d82b909e382e6db4468",
    "0xA3Dab6698A602B0cB114D09Bc652E7fE87a257d1",
    "0x96b6d6b1630B1C6B9ed0bF0BB88bC6dD3434D04B",
    "0xC513f9385F990FA063B50167057878f9Ee0f3ABB",
    "0x8e5db46af86642c935D96D6d8815c489718f31F4",
    "0x4829c7c11718fF91dafB05c3209E63a596103204",
    "0x4ecbb6b167bcea5fd5c654fb2b33a1a27f619d31",
    "0x36BCBAb5e51Fe94BcdE0b96d2D172f2b5Ae2d33d",
    "0x137bc59617203B1361b46Efd5783c108d6589382",
    "0x4F7afcF51E44283E8625D3A07104CAE508228397",
    "0x9462757097836ef5ddff1eff0475127c908162e7"
  ];

  try {
    const result = await factoryContract.methods
        .whitelistUsers(addresses)
        .send({ from: OWNER_ADDRESS })
    console.log("Whitelisting users. Transaction: " + result.transactionHash);
  } catch (e) {
    console.log(e)
  }
}

main();
