const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot Contract", async function () {
  let ballot;
  let ballotFactory;
  let proposalNames;
  let chairperson;
  let voter1;
  let voter2;
  let voter3;
  let voter4;

  before(async () => {
    ballot = await ethers.getContractFactory("Ballot");
    proposalNames = ["Proposal 1", "Proposal 2", "Proposal 3"];
    ballotFactory = await ballot.deploy(proposalNames);
    [chairperson, voter1, voter2,voter3,voter4] = await ethers.getSigners();
  });

  it("if there is not vote should return empty string ", async function () {
    const notVotedProposal = await ballotFactory.connect(chairperson).winningName();
  
    expect(notVotedProposal).to.equal("");
  });
  
  it("should create a new ballot with correct proposals", async function () {
    expect(
      ballotFactory.proposals(0),
      proposalNames,
      " Proposal Names are not same with parametres "
    );
  });

  it("should owner can vote", async function () {
    const proposalIndex = 0;
    await ballotFactory.connect(chairperson).giveRightToVote(voter1.address);
    await ballotFactory.connect(voter1).vote(proposalIndex);

    const a = await ballotFactory.voters(voter1.address);
    expect(a.voted).to.equal(true);
  });

  it("should can be pausable", async function () {
    const proposalIndex = 0;
    await ballotFactory.connect(chairperson).Pause();
    const paused = await ballotFactory.paused();

    expect(paused).to.equal(true);
    await ballotFactory.connect(chairperson).Unpause();
  });

  it("should ownership can be changed", async function () {
    await ballotFactory.connect(chairperson).transferOwnership(voter1.address);
    const ownerAddress = await ballotFactory.connect(voter1).owner();
    expect(ownerAddress).to.equal(voter1.address);
    await ballotFactory.connect(voter1).transferOwnership(chairperson.address);
  });
  
  it("should winner can be determined ", async function () {
    await ballotFactory.connect(chairperson).vote(0);
    const a = await ballotFactory.voters(chairperson.address);
    const winnerName = await ballotFactory.connect(chairperson).winningName();
    expect(winnerName).to.equal(proposalNames[0]);
  });

  it("should return error if voter has not have right to vote", async function () {
    await ballotFactory.connect(chairperson).giveRightToVote(voter2.address);
    await ballotFactory.connect(voter2).vote(0);
    await expect(ballotFactory.connect(voter2).vote(1)).to.be.revertedWith(
      "Already voted"
    );
  });

  it("should return error if anyone other than chairperson tries to give right", async function () {
    await expect(
      ballotFactory.connect(voter1).giveRightToVote(voter3.address)
    ).to.be.revertedWith("only chair person access to vote");
  });

  it("should return error if anyone tries to vote despite not having the right to vote", async function () {
    await expect(
      ballotFactory.connect(voter4).vote(1)
    ).to.be.revertedWith("Has no right to vote");
  });
  
  
});
