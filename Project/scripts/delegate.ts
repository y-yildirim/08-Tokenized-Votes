import { Contract, ethers } from "ethers";
import "dotenv/config";

import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { checkBalance, getSigner } from "./utils";

async function main() {
  const signer = getSigner();

  checkBalance(signer, 0.01);

  const tokenAddress = process.env.TOKEN_ADDRESS!;
  const delegateeAddress = process.argv[2];

  console.log(`Attaching token contract interface to address ${tokenAddress}`);
  const tokenContract = new Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  ).attach(tokenAddress);

  console.log(`Delegating votes to ${delegateeAddress}`);
  const tx = await tokenContract.delegate(delegateeAddress);
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
