import { ethers } from "ethers";
import "dotenv/config";

import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { getSigner } from "./utils/utils";
import { MyToken } from "../typechain/MyToken";

async function main() {
  const signer = getSigner();

  const tokenFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    signer
  );

  const tokenContract = (await tokenFactory.attach(
    process.env.TOKEN_ADDRESS!
  )) as MyToken;

  console.log(`Token Contract address: ${tokenContract.address}`);

  const voterAddress = process.argv[2];
  const amount = process.argv[3];

  console.log(`Minting ${amount} tokens to ${voterAddress} address`);
  const mintTx = await tokenContract.mint(
    voterAddress,
    ethers.utils.parseEther(amount.toString())
  );
  console.log("Awaiting confirmations");
  mintTx.wait;
  console.log(`Transaction completed. Hash: ${mintTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
