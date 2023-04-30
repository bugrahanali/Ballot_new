// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ballot is Ownable,Pausable{

    struct Voter{
        bool voted;
        uint vote;
        uint weight;
    }

    struct Proposal{
        string name;
        uint voteCount;
    }
    function Pause()public onlyOwner{
        _pause();
    }
    function Unpause() public onlyOwner{
        _unpause();
    }

    address public chairperson;
    Proposal[] public proposals;
    mapping(address => Voter) public voters;

    constructor(string[] memory proposalNames){
        chairperson=msg.sender;
        voters[chairperson].weight=1;
        for(uint i=0; i < proposalNames.length ;i++){
            proposals.push(Proposal({
                name:proposalNames[i],
                voteCount:0
            } ));
        }
    }

    function giveRightToVote(address voter) public {
        require(msg.sender==chairperson,"only chair person access to vote");
        require(!voters[voter].voted,"voter has already voted");
        require(voters[voter].weight==0);

        voters[voter].weight=1;
    }

    function vote (uint proposal) public whenNotPaused{
        Voter storage sender =voters[msg.sender];
        require(!sender.voted, 'Already voted');
        require(sender.weight !=0,'Has no right to vote');
        sender.voted=true;
        sender.vote=proposal;

        proposals[proposal].voteCount+=sender.weight;
        sender.weight=0;
    }

    function winningProposal() public view returns(uint winningProposal_) {
        uint winningVoteCount = 0;
        winningProposal_ = 0; 
        
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposal_ = i;
            }
        }
    }
    
    function winningName() public view returns (string memory winningName_) {
        uint winningProposalIndex = winningProposal();
        
        if (proposals[winningProposalIndex].voteCount == 0) {
            return "";
        }
        
        winningName_ = proposals[winningProposalIndex].name;
    }
    
}
