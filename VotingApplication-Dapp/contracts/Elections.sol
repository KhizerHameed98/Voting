pragma solidity ^0.5.3;

contract Elections {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store Candidates
    // Fetch Candidate
    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    event votedEvent(uint indexed);
    // Store Candidates Count
    uint public candidatesCount;
    
    

    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
    function vote(uint _candidateId) public{
        require(voters[msg.sender]==false, "You've Voted Already");
        require(_candidateId >0 && _candidateId<=candidatesCount, "Invalid Candidate Dude !!!!");
        candidates[_candidateId].voteCount++;
        voters[msg.sender]=true;
        emit votedEvent(_candidateId);

    }

}
