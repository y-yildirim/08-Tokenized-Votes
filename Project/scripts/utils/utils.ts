import { ethers } from "ethers";

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array: any[] = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

function getSigner(): ethers.Wallet {
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC!);
  const API_KEY = process.env.ALCHEMY_API_KEY;
  const provider = new ethers.providers.AlchemyProvider("goerli", API_KEY);
  return wallet.connect(provider);
}

async function checkBalance(signer: ethers.Wallet, minBalance: number) {
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < minBalance) {
    throw new Error("Not enough ether");
  }
}

export { checkBalance, getSigner, convertStringArrayToBytes32 };
