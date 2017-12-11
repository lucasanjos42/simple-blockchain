const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(data) {
        this.index = 0
        this.timestamp = Date.now()
        this.previousHash = ''
        this.data = data
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.nonce++
            this.hash = this.calculateHash()
        }

        console.log(`Block mined: ${this.hash}`)
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 3
    }

    createGenesisBlock() {
        return new Block('Genesis Block')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.index = this.getLatestBlock().index + 1
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    isChainValid() {

        for (let i = 1; i <= this.chain.length; i++) {

            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash())
                return false

            if (currentBlock.previousHash !== previousBlock.hash)
                return false

            return true
        }

    }
}

const anjosCoin = new Blockchain()

console.log('Mining block 1...')
anjosCoin.addBlock(new Block({ amount: 10 }))

console.log('Mining block 2...')
anjosCoin.addBlock(new Block({ amount: 06 }))

// tamper blockchain
// anjosCoin.chain[1].data = { amount: 20 }

// console.log(anjosCoin.chain, null, 4) // show entire blockchain

console.log(`--> Is Blockchain Valid? : ${anjosCoin.isChainValid()}`)