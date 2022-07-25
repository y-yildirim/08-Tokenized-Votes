import { Contract, ethers } from "ethers";
import "dotenv/config";

import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { checkBalance, getSigner } from "./utils";

async function main() {
  const signer = getSigner();

  checkBalance(signer, 0.01);

  const tokenAddress = process.env.TOKEN_ADDRESS!;
  const ballotAddress = process.env.BALLOT_ADDRESS!;
  const delegateeAddress = process.argv[2];
  const proposal = process.argv[1];
  const BASE_VOTE_POWER = 10;

  console.log(`Attaching token contract interface to address ${tokenAddress}`);
  const tokenContract = new Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  ).attach(tokenAddress);

  const ballotContract = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ).attach(ballotAddress);

  console.log(`Miniting tokens to ${delegateeAddress}`);
  const mintTx = await tokenContract.mint(delegateeAddress, ethers.utils.parseEther(BASE_VOTE_POWER.toFixed(18)));

  console.log(`Delegating votes to ${delegateeAddress}`);
  const delegateTx = await tokenContract.delegate(delegateeAddress);
  console.log("Awaiting confirmations");
  await delegateTx.wait();
  console.log(`Transaction completed. Hash: ${delegateTx.hash}`);

  const getVotesTx = await tokenContract.getVotes(delegateeAddress);
  console.log("processing...");
  await getVotesTx.wait();
  console.log(`Completed. Hash: ${getVotesTx.hash}`);

  const voteTx = await tokenContract.connect(delegateeAddress).vote(proposal);
  console.log("processing...");
  await voteTx.wait();
  console.log(`Completed. Hash: ${voteTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});