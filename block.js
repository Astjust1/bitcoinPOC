const crypto = require('crypto');
const moment = require('moment');

 class Block {
    constructor(index,timestamp,data,previous_hash){
        this.index = index;
        this.timestamp = timestamp;
        this.nonce = 0;
        this.data = data;
        this.previous_hash = previous_hash;
        this.hash = this.hashBlock();
    }

    hashBlock(){
        let sha = crypto.createHmac('sha256', 'test');
        sha.update(this.index.toString() + this.timestamp.toString() + this.nonce.toString() + this.data.toString()  + this.previous_hash.toString());
        return sha.digest('hex');
    }
}

let createGenesisBlock = ()=>{
    return new Block(0,moment().format(),
    {
        data:"Genesis",
        transactions: null
    },"null");
}
/*
let blockchain = [createGenesisBlock()];
console.log(blockchain);

let previousBlock = blockchain[0];
//console.log(blockchain);
for(let i=0; i < 20; ++i) {
    //console.log(i);
    let addBlock = nextBlock(previousBlock);
    blockchain.push(addBlock);
    previousBlock = addBlock;

    console.log(`Block # ${addBlock.index} has been added`);
    console.log(`Hash: ${addBlock.hash}`);
}
*/
//console.log(typeof Block);
module.exports = {
    Block: Block,
    createGenesisBlock: createGenesisBlock
}