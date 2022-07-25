# Group 8 Project Report (Week 2)

7/25/2022

Here we present the functionality of our scripts verifiable by **goerli testnet** transactions.

----------------------------------------------------------------------------------
1. The contracts ***(MyToken.sol, CustomBallot.sol)*** are deployed using ***deploy-token.ts*** and ***deploy-ballot.ts*** respectively.
2. Minted 10 tokens for accounts using ***mint.ts*** script.
3. Accounts delegated themself to be able to vote.
4. Everyone voted using ***vote.ts*** script.
5. Printed winner using ***queryWinner.ts*** script.
----------------------------------------------------------------------------------

Token address: **0xf182D762C280e82530e916623FEDBCdC1f50C07F**
Ballot adress: **0xC0E7A43a5321D2E7D996b4B255eDB5fbF136d768**

Proposals:
0. Zelda
1. GTAV
2. RDR2
3. HL2 
4. BioShock
----------------------------------------------------------------------------------

## Running Scripts
### 1. `deploy-token.ts` 
Usage : 
```powershell
yarn ts-node --files .\scripts\deploy-token.ts
```

Output:
```powershell
Deploying Token contract
Wallet balance 0.6111379519050758
Awaiting confirmations
Completed
Contract deployed at 0xf182D762C280e82530e916623FEDBCdC1f50C07F
```

### 2. `deploy-ballot.ts`
Usage : 
```powershell
yarn ts-node --files .\scripts\deploy-ballot.ts Zelda GTAV RDR2 HL2 BioShock
```

Output:
```powershell
Deploying Ballot contract
Proposals:
Proposal N. 1: Zelda
Proposal N. 2: GTAV
Proposal N. 3: RDR2
Proposal N. 4: HL2
Proposal N. 5: BioShock
Wallet balance 0.6036135468658657
Awaiting confirmations
Completed
Contract deployed at 0xC0E7A43a5321D2E7D996b4B255eDB5fbF136d768
```

### 3. `mint.ts`
Usage : 
```powershell
yarn ts-node --files .\scripts\mint.ts 0xF9B91d6DdE5ae8302FCf3BC4a8B61bfA79d73D06 10
```

Output:
```powershell
Token Contract address: 0xf182D762C280e82530e916623FEDBCdC1f50C07F
Minting 10 tokens to 0xF9B91d6DdE5ae8302FCf3BC4a8B61bfA79d73D06 address
Awaiting confirmations
Transaction completed. Hash: 0x14302a3f508f5324ba1b8f6b7182da6c5ad690be57b7b4e7199bf4ba90877f0b
```

### 4. `delegate.ts`
Usage : 
```powershell
yarn ts-node --files .\scripts\delegate.ts 0xF9B91d6DdE5ae8302FCf3BC4a8B61bfA79d73D06
```

Output:
```powershell
Attaching token contract interface to address 0xf182D762C280e82530e916623FEDBCdC1f50C07F
Delegating votes to 0xF9B91d6DdE5ae8302FCf3BC4a8B61bfA79d73D06
Wallet balance 0.6019112073577064
Awaiting confirmations
Transaction completed. Hash: 0x66710e2fb30264cf3af9757e3454d6f38491a15c9e46de73c2f6a298204b4e43
```

### 5. `vote.ts`
Usage : 
```powershell
yarn ts-node --files .\scripts\vote.ts 2 10
```

Output:
```powershell
Wallet balance 0.601785096357089
Zelda
GTAV
RDR2
HL2
BioShock
Voting for RDR2
Attaching Ballot contract interface to address 0xC0E7A43a5321D2E7D996b4B255eDB5fbF136d768
processing...
Completed. Hash: 0x1f92321ca7818eee22e54298afb3c4a68263e0effa6991694cea8817112485ae
```



