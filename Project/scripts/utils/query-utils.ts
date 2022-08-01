import { BigNumber, ethers } from "ethers";

import { CustomBallot } from "../../typechain/CustomBallot";

async function getProposals(ballotContract: CustomBallot): Promise<string[]> {
  // return (await ballotContract.getProposals()).map((p) =>
  //   [
  //     ethers.utils.parseBytes32String(p.name),
  //     ethers.utils.parseBytes32String(p.voteCount.toString()),
  //   ]
  //     .join(" ")
  //     .toString()
  // );
  return (await ballotContract.getProposals()).map((p) =>
    ethers.utils.parseBytes32String(p.name)
  );
}

async function getResults(ballotContract: CustomBallot) {
  const winnerName = ethers.utils.parseBytes32String(
    await ballotContract.winnerName()
  );
  console.log(`Winner is ${winnerName}`);
}

export { getProposals, getResults };
