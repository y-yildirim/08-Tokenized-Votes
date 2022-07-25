import { ethers } from "ethers";

import { CustomBallot } from "../../typechain/CustomBallot";

async function getProposals(ballotContract: CustomBallot) {
  return (await ballotContract.getProposals()).forEach(console.log);
}

async function getResults(ballotContract: CustomBallot) {
  const winnerName = ethers.utils.parseBytes32String(
    await ballotContract.winnerName()
  );
  console.log(`Winner is ${winnerName}`);
}

export { getProposals, getResults };
