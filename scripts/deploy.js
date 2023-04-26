const { ethers } = require("hardhat");

async function main() {
  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(["AKP"]);
  await ballot.deployed();
  console.log("Ballot contract deployed to:", ballot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
