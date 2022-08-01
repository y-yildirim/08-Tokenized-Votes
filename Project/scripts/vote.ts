import { Contract, ethers } from "ethers";
import "dotenv/config";

import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { checkBalance, getSigner } from "./utils/utils";
import { CustomBallot } from "../typechain";
import { getProposals } from "./utils/query-utils";

async function main() {
  const signer = getSigner();

  checkBalance(signer, 0.01);

  const ballotAddress = process.env.BALLOT_ADDRESS!;
  const proposalIndex = Number(process.argv[2]);
  const BASE_VOTE_POWER = 10;
  const voteAmount = process.argv[3] ?? BASE_VOTE_POWER;

  const ballotContract = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ).attach(ballotAddress) as CustomBallot;

  const votingPower = Number(await ballotContract.votingPower());
  if (votingPower < Number(voteAmount))
    throw new Error("Not enough voting power!");

  const proposals = await getProposals(ballotContract);
  proposals.forEach((p) => console.log(p));
  console.log(`Voting for ${proposals[proposalIndex]}`);

  console.log(
    `Attaching Ballot contract interface to address ${ballotAddress}`
  );
  const voteTx = await ballotContract.vote(proposalIndex, voteAmount);
  console.log("processing...");
  await voteTx.wait();
  console.log(`Completed. Hash: ${voteTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});