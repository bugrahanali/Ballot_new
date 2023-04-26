Sure, here's a basic README file for your Ballot contract:

# Ballot Contract

This contract is a simple ballot that allows a single chairperson to give voting rights to other Ethereum addresses, who can then vote on a set of proposals. The winning proposal is determined by a simple majority vote. The contract is based on the [OpenZeppelin](https://openzeppelin.com/) Pausable and Ownable contracts.

## Usage

The `Ballot` contract can be deployed by passing an array of proposal names to the constructor. The `giveRightToVote` function can be used by the chairperson to grant voting rights to an address. Each address is granted a weight of 1, which can be used to cast a vote for a single proposal.

Once an address has been granted voting rights, they can cast a vote for a proposal by calling the `vote` function, passing the index of the proposal they wish to vote for. Once a vote has been cast, the address is no longer able to vote again.

The `winningProposal` function can be used to determine the winning proposal, while the `winningName` function can be used to get the name of the winning proposal.

## Functions

- `giveRightToVote(address voter)`: Grants voting rights to the specified address.
- `vote(uint proposal)`: Casts a vote for the specified proposal.
- `winningProposal()`: Returns the index of the winning proposal.
- `winningName()`: Returns the name of the winning proposal.

## Ownership

The contract inherits from the `Ownable` contract, meaning that the owner can call the `Pause` and `Unpause` functions to pause and unpause the contract, respectively.

## License

This contract is released under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).
