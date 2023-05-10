## WIRY 

Wiry (WIRY) is an ERC-20 token deployed on the Polygon network.

#### Table on contents

[Prereqiusites](#preqs)  
[Build](#build)  
[Test](#tests)  
[Run Scripts](#run)  
[Deploy](#deploy)  
[Networks](#networks)  
[Wallets](#wallets)  
[Structure of Deploy Output File](#output)  
[Logic](#logic)  
[[Known Issues]](#issues)

<a name="preqs">

#### Prerequisites

- Install [Git](https://git-scm.com/)
- Install [Node.js](https://nodejs.org/en/download/)
- Clone this repository
- Navigate to the directory with the cloned code
- Install Hardhat with `npm install --save-dev hardhat`
- Install all required dependencies with `npm install`
- Create a file called `.env` in the root of the project with the same contents as `.env.example`
- Place your secret API keys, private keys, etc. to the `.env` file

  :warning:**DO NOT SHARE YOUR .env FILE IN ANY WAY OR YOU RISK TO LOSE ALL YOUR FUNDS**:warning:

<a name="build"/>

### Build

```
npx hardhat compile
```

<a name="tests"/>

### Test

```
npx hardhat test --network hardhat
```

<a name="run"/>

### Run Scripts

```
npx hardhat run <script file name here> --network <network name here>
```

<a name="deploy"/>

### Deploy

```
npx hardhat run scripts/deploy.js --network <network name here>
```

Deployment script takes about 5 minutes to complete. Please, be patient!
After the contracts get deployed you can find their _addresses_ and code verification _URLs_ in the `scripts/deployOutput.json` file (see [Structure of Deploy Output File](#output)).
Note that this file only refreshes the addresses of contracts that have been successfully deployed (or redeployed). If you deploy only a single contract then its address would get updated and all other addresses would remain untouched and would link to _old_ contracts.
Please, **do not** write anything to `deployOutput.json` file yourself! It is a read-only file.
All deployed contracts _are verified_ on [Polygonscan](https://mumbai.polygonscan.com/).

<a name="networks"/>

### Networks

а) **Polygon test** network
Make sure you have _enough test tokens_ for testnet.

```
npx hardhat run <script name here> --network polygon_testnet
```

b) **Polygon main** network
Make sure you have _enough real tokens_ in your wallet. Deployment to the mainnet costs money!

```
npx hardhat run <script name here> --network polygon_mainnet
```

c) **Local** network

- Run Hardhat node locally:

```
npx hardhat node
```

- Run sripts on the node

```
npx hardhat run <script name here> --network localhost
```

<a name="wallets"/>

### Wallets

For deployment you will need to use either _your existing wallet_ or _a generated one_.

#### Using an existing wallet

If you choose to use your existing wallet, then you will need to be able to export (copy/paste) its private key. For example, you can export private key from your MetaMask wallet.
Wallet's address and private key should be pasted into the `.env` file (see [Prerequisites](#preqs)).

#### Creating a new wallet

If you choose to create a fresh wallet for this project, you should use `createWallet` script from `scripts/` directory.

```
node scripts/createWallet.js
```

This will generate a single new wallet and show its address and private key. **Save** them somewhere else!
A new wallet _does not_ hold any tokens. You have to provide it with tokens of your choice.
Wallet's address and private key should be pasted into the `.env` file (see [Prerequisites](#preqs)).

### Structure of Deploy Output File

This file contains the result of contracts deployment.

It is separated in 2 parts. Each of them represents deployment to testnet or mainnet.
Each part contains information about all deployed contracts:

- The address of the contract (`address`)
- The URL for Polygonscan page with verified code of the contract (`verification`)

<a name="logic"/>

### Logic

#### Ownership  

The owner of the contract has a right to call special functions of the contract. *Owner* is the wallet from which the contract was deployed to the network.  
Owner is allowed to:
- pause / unpause contract
- mint tokens
- burn tokens from users` wallets
- add addresses to blacklist
- remove addresses from blacklist


#### Pause / Unpause

The Wiry token is a pausable contract. Than means, it's execution can be paused at any moment and unpaused later. When paused, no tokens transfers will happen.  
Please note, that *only the owner* of the contract can pause and unpause it.

- To **pause** contract use `pause` function. 
- To **unpause** contract use `unpause` function.
---

<a name="issues"/>

**[Known Issues]**
