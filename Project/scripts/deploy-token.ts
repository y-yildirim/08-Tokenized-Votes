import { ethers } from "ethers";
import "dotenv/config";

import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { getSigner, checkBalance } from "./utils/utils";

async function main() {
  const signer = getSigner();

  checkBalance(signer, 0.01);

  console.log("Deploying Token contract");
  const tokenFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    signer
  );
  const tokenContract = await tokenFactory.deploy();
  console.log("Awaiting confirmations");
  await tokenContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${tokenContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
