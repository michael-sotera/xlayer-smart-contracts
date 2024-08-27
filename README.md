# Compile the contracts

```shell
npx hardhat compile
```

# Deloy to Testnet

```shell
npx hardhat run --network xlayerTestnet scripts/deploy.js
```

# Deloy to Mainnet

```shell
npx hardhat run --network xlayerMainnet scripts/deploy.js
```

# Verify the `forwarder` contract

````shell
1. Get the forwarder contract address in the `deployments` folder (note the file name contains the desired network name)
2. Run the following command:

```shell
npx hardhat okverify --network xlayerMainnet <forwarder-contract-address> PlaygroundGameMatchForwarder
````

# Verify the Playground Game contract

1. Get the implementation contract address for the Playground Game in the `deployments` folder (note the file name contains the desired network name)
2. Run the following command:

```shell
npx hardhat okverify --network xlayerMainnet <implementation-contract-address> <forwarder-contract-address>
```
