import { ethers } from "ethers";
import "dotenv/config";
import * as tokenJson from "artifacts/contracts/MyToken.sol/MyToken.json"
import { MyToken } from "typechain";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY = "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

function setupProvider() {
    const alchemy = process.env.ALCHEMY_API_KEY;
    const provider = ethers.providers.getDefaultProvider("goerli", alchemy);
    return provider;
  }

  async function main() {
    const wallet =
      process.env.MNEMONIC && process.env.MNEMONIC.length > 0
        ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
        : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
    console.log(`Using address ${wallet.address}`);
  
    const provider = setupProvider();
    const signer = wallet.connect(provider);
    const tokenFactory = new ethers.ContractFactory(
        tokenJson.abi,
        tokenJson.bytecode,
        signer
      );
    const tokenContract = await tokenFactory.attach(process.env.TOKEN_ADDRESS) as MyToken;
    const mintTx = await tokenContract.mint(
      );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
