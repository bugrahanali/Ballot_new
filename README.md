## Getting Started

To get started with this project, follow these steps:

1. Run `npm i` to install the necessary dependencies.
2. Create a new `.env` file in the same directory as the JSON files, and add `PRIVATE_KEY=` followed by your own private key.
3. Run `npx hardhat deploy` to deploy the contracts.
4. Run `npx hardhat test` to run the test suite.

Note: Before running the tests, make sure to update the test suite with your own contract addresses and other relevant information.

We hope this helps you get started with the project. If you have any questions or issues, please feel free to reach out to us.

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
