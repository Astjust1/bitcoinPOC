const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const moment = require('moment');

const Block = require('./block');
const BlockChain = require('./blockChain');

const idgen = require('idgen');

const app = new Koa();
const router = new KoaRouter();

//URL for memes to be used as data
const memeUrl = 'https://api.imgflip.com/get_memes'

//Variable Setup
let transactions = [];

//console.log(moment().format());

//Actual chain is at bC.ledger (bc is a reference to the variable)
let blockChain = new BlockChain.BlockChain();

let minerAddress = idgen(24);

let peerNodes = [];

router.get('/', (ctx,next)=>{
    console.log(ctx);
    //ctx.status= 200;
    ctx.body = "hello world"
});


router.post('/transaction',koaBody(),(ctx,next)=>{
    let transaction = ctx.request.body;
    //console.log(transaction);
    transactions.push(transaction);

    console.log('New Transaction');
    console.log(`FROM: ${transaction.from}`);
    console.log(`TO: ${transaction.to}`);
    console.log(`AMOUNT: ${transaction.amount}`);

    ctx.body = `Successs!!!`
});

router.get('/mine',(ctx,next)=>{
    let lastBlock = blockChain.getLastBlock();

   transactions.push(
       {
           'from': 'network',
           'to': minerAddress,
           'amount': 1
       }
   )

   let newData = {
       data: "Cheeeeese",
       transactions: transactions
   }

   let newIndex = lastBlock.index+ 1;
   let time = moment().format();
   let prevHash = lastBlock.hash;

   let blockToBeMined = new Block.Block(
       newIndex,
       time,
       newData,
       prevHash
   );

   let finishedBlock = BlockChain.proofOfWork(blockToBeMined,3);
   //console.log(finishedBlock);

   blockChain.appendBlock(finishedBlock);

   transactions = [];
   console.log(blockChain.ledger);
   console.log(blockChain.length)
   ctx.body = blockChain.ledger;

});

router.get('/blocks',(ctx,get)=>{
    ctx.body = blockChain.ledger;
});

let findOtherChains = ()=>{
    otherChains = [];
    peerNodes.forEach((url)=>{
        //make get'/blocks' request to that node's url
        //add to otherChains
    });
    return otherChains;
}

//Maybe find think of some other ways to do this
let consensus = ()=>{
    let newChains = findOtherChains();

    longestChain = blockChain;
    newChains.forEach((chain)=>{
        if(chain.length > longestChain.length){
            longestChain = chain;
        }
    })

    blockChain = longestChain;

}


app.use(router.routes());
app.listen(3000);

//console.log('curl -i http://localhost:3000');