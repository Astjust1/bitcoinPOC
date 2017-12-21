const Block = require('./block');
const crypto = require('crypto');


class BlockChain {
    constructor(){
        this.ledger = [Block.createGenesisBlock()];
        //just curious to see if this works it doesnt
        this.length = this.ledger.length;
    }
    appendBlock(block){
        this.ledger.push(block);
        this.length++;
    }

    getLastBlock(){
        return this.ledger[this.length -1];
    }

    getLength(){
        return this.length;
    }
}

let proofOfWork = function(block,difficulty){
    //set up nonce
    let nonce = block.nonce;

    let oGHash = block.hash;
 
    //make a temp hash variable
    let hash = oGHash;

    //while the prefix check has failed
    while(!prefixCheck(hash,difficulty)){
        //do the magic
        nonce++;
       
        block.nonce = nonce;
        hash = block.hashBlock();

       // console.log(`Nonce: ${nonce}`);
        //console.log(`Hash: ${hash}`);
    }
 
    //set the nonce and hash for the block in question

    block.nonce = nonce;
    block.hash = hash;
    //return the block
    return block
}

let prefixCheck = (hash,prefixSize)=>{
    let prefix = hash.slice(0,prefixSize);
    //console.log(prefix.length);
    for (let i=0; i< prefix.length;++i) {
        let char = prefix[i];
        if(char !== "0"){
            return false;
        }
    }
    return true;
}
/*
let chain = new BlockChain();
//console.log(block);

let str = "apppppppppllleeeeee";
//console.log(chain.ledger[0].hash);
let testBlock = new Block.Block(12, Date.now(), {data:'test',transactions:[]},chain.ledger[0].hash);
//console.log(str.slice(0,1));
console.log(proofOfWork(testBlock,5));

console.log(`Check: ${testBlock.hashBlock()}`)

let falseBlock = testBlock;
falseBlock.nonce++;
console.log(falseBlock);
console.log(`FalseCheck: ${falseBlock.hashBlock()}`);
//console.log(chain.ledger);
//console.log(chain.proofOfWorkTest());
*/
module.exports = {
    BlockChain: BlockChain,
    proofOfWork: proofOfWork
}