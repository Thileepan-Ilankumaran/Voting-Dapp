const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let votingContract;
  let owner;
  const candidateNames = ["Mark", "Mike", "Henry", "Rock"];
  const durationInMinutes = 90;

  beforeEach(async () => {
    // Get accounts from Hardhat
    [owner] = await ethers.getSigners();

    // Deploy the contract with an initial list of candidates and duration
    const Voting = await ethers.getContractFactory("Voting");
    votingContract = await Voting.deploy(candidateNames, durationInMinutes);
    await votingContract.deployed();
  });

  it("should allow the owner to add a new candidate", async () => {
    const newCandidateName = "John Doe";

    // Call the `addCandidate` function with a new candidate name
    await votingContract.addCandidate(newCandidateName);

    // Retrieve all candidates
    const allCandidates = await votingContract.getAllVotesOfCandiates();

    // Check if the new candidate has been added
    expect(allCandidates.length).to.equal(candidateNames.length + 1);
    expect(allCandidates[allCandidates.length - 1].name).to.equal(newCandidateName);
    expect(allCandidates[allCandidates.length - 1].voteCount.toNumber()).to.equal(0); // Convert to a regular number
  });

  it("should allow a non-voter to vote for a valid candidate", async () => {
    const nonVoter = await ethers.getSigner(1); // Assuming the second account is a non-voter
    const candidateIndex = 1; // Vote for the second candidate

    // Call the `vote` function with a valid candidate index using a non-voter address
    await votingContract.connect(nonVoter).vote(candidateIndex);

    // Retrieve all candidates
    const allCandidates = await votingContract.getAllVotesOfCandiates();

    // Check if the vote is reflected in the candidate's vote count
    expect(allCandidates[candidateIndex].voteCount.toNumber()).to.equal(1); // Convert to a regular number
  });

  
  
  // Add more test cases here...
});
