import fs from "fs";
import { ethers, upgrades, network } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(owner.address);

  const networkName = network.name;

  console.log("Deploying ERC2771Forwarder...");
  const ERC2771Forwarder = await ethers.getContractFactory("ERC2771Forwarder");
  const forwarder = await ERC2771Forwarder.deploy(
    "PlaygroundGameMatchForwarder",
    {}
  );
  await forwarder.waitForDeployment();
  const forwarderAddress = await forwarder.getAddress();
  console.log("Forwarder deployed to:", forwarderAddress);

  const C = await ethers.getContractFactory("PlaygroundGameMatchXLayer");

  const panic = await upgrades.deployProxy(C, [], {
    kind: "uups",
    initializer: "initialize",
    constructorArgs: [forwarderAddress],
  });
  await panic.waitForDeployment();

  const cc = await upgrades.deployProxy(C, [], {
    kind: "uups",
    initializer: "initialize",
    constructorArgs: [forwarderAddress],
  });
  await cc.waitForDeployment();

  const p = await upgrades.deployProxy(C, [], {
    kind: "uups",
    initializer: "initialize",
    constructorArgs: [forwarderAddress],
  });
  await p.waitForDeployment();

  const addresses = {
    forwarder: forwarderAddress,
    panic: {
      proxy: await panic.getAddress(),
      impl: await upgrades.erc1967.getImplementationAddress(
        await panic.getAddress()
      ),
    },
    copycat: {
      proxy: await cc.getAddress(),
      impl: await upgrades.erc1967.getImplementationAddress(
        await cc.getAddress()
      ),
    },
    parkour: {
      proxy: await p.getAddress(),
      impl: await upgrades.erc1967.getImplementationAddress(
        await p.getAddress()
      ),
    },
  };
  console.log("Addresses:", addresses);

  fs.writeFileSync(
    `./deployments/${networkName}_erc2771.json`,
    JSON.stringify(addresses, null, 2)
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
