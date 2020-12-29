const { assert } = require("chai");

var Election = artifacts.require("./Elections.sol");

contract("Elections", function(accounts) {
    var electionInstance;
    

    it("initializes with two candidates", function() {
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count, 2);
        });
    });

    it("it initializes the candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Candidate 1", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
        });
    });
    
    it("initializes the vote", function(){
        return Election.deployed().then(function(instance) 
        {
            electionInstance = instance;
           
            return electionInstance.vote(1, {from: accounts[1]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length,1 , "An Event was triggered");
            assert.equal(receipt.logs[0].event, "votedEvent", "the Event type is correct!!!");
            
            return electionInstance.voters(accounts[1]);
            
        }).then(function(voted){
            assert(voted, "The user has voted");
            return electionInstance.candidates(1);
        }).then(function(candidate){
            assert.equal(Number(candidate[2]),1, "The voteCount Incremented successfully");
        });
    });
    
});

    
    

