import { ethers } from "ethers";
import "dotenv/config";

import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { getSigner, checkBalance, convertStringArrayToBytes32 } from "./utils/utils";

async function main() {
  const signer = getSigner();

  checkBalance(signer, 0.01);

  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  const proposals = process.argv.slice(2);
  if (proposals.length < 2) throw new Error("Not enough proposals provided");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const ballotFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode,
    signer
  );
  const tokenContractAddress = process.env.TOKEN_ADDRESS;
  const ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(proposals),
    tokenContractAddress
  );
  console.log("Awaiting confirmations");
  await ballotContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${ballotContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
