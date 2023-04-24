const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Ballot Contract", async function () {
  let ballot;
  let ballotFactory;
  let proposalNames;
  let owner;
  let voter;

  before(async () => {
    ballot = await ethers.getContractFactory("Ballot");
    proposalNames = ["Proposal 1", "Proposal 2", "Proposal 3"];
    ballotFactory = await ballot.deploy(proposalNames);
    [owner, voter] = await ethers.getSigners();
  });
  
  it("should create a new ballot with correct proposals", async function () {
    
    expect(ballotFactory.proposals(0), proposalNames, " Proposal Names are not same with parametres ");  
      
  });

  it("should owner can vote", async function(){
    const proposalIndex=0;
    await ballotFactory.connect(owner).giveRightToVote(voter.address);
    await ballotFactory.connect(voter).vote(proposalIndex);

    const a =await ballotFactory.voters(voter.address);
    expect(a.voted).to.equal(true);

  })

  it("should can be pausable", async function () {
    const proposalIndex = 0;
    await ballotFactory.connect(owner).Pause();
    const paused = await ballotFactory.paused();

    expect(paused).to.equal(true);
    await ballotFactory.connect(owner).Unpause();
  });

  it("should ownership can be changed",async function(){
    
    await ballotFactory.connect(owner).transferOwnership(voter.address)
    const ownerAddress=await ballotFactory.connect(voter).owner();
    expect(ownerAddress).to.equal(voter.address)
  })
   it("should winner can be determined ",async function(){
    await ballotFactory.connect(owner).vote(0)
    const a =await ballotFactory.voters(owner.address);
    const winnerName=await ballotFactory.connect(owner).winningName();
    expect(winnerName).to.equal(proposalNames[0])
   })
});
