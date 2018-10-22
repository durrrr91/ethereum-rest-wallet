const ethers = require('ethers');
const infuraProvider = new ethers.providers.InfuraProvider('rinkeby', "192154cd42194ca5bca25dc0b25c3855");
// const privateKeyWithMoney = "a441798f63fbcca04272809bb523d7cc7f5e03fa651cbceb0585ad7a26abfe69";
// const publicAddressWithMoney = "0x0e08e025f84eB60c45397C69fd726CA1432C782e";
// const destinationThatIOwn = "0x0d215dC4bB0d75fD99E36238E0bf4261c2527385";

exports.getBalance = async (req, res, next) => {
    const balance = await getAddressBalance(req.params.address);
    if(balance !== null) { 
        res.json(balance);
    }else {
        res.status(404).send({"error": "The supplied address is invalid."});
    }
}
exports.sendTransaction = async (req, res, next) => { 
    const privateKey = req.body.privateKey;
    const amount = req.body.amount;
    const destination =  req.body.destination;
    const wallet = new ethers.Wallet(privateKey)
    const address = wallet.signingKey.address;
    let nonce = await getTransactionCount(address);
    if(nonce === null) {
        res.status(422).send({"error": "The supplied address is invalid."})
    }
    const balance = await getAddressBalance(address);

    if(balance < amount) {
        res.status(422).send({"error": "You do not have enough ETH to complete this transaction."})
    }

    let transaction = {
        nonce: nonce,
        gasLimit: 21000,
        gasPrice: ethers.utils.bigNumberify("20000000000"),
        to: destination,
        value: ethers.utils.parseEther(amount),
        data: "0x",
        chainId: ethers.utils.getNetwork('rinkeby').chainId
    }
    
    let signPromise = wallet.sign(transaction)
    signPromise.then((signedTransaction) => {
        infuraProvider.sendTransaction(signedTransaction).then((tx) => {
            res.json(tx);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }).catch((error) => {
        res.status(500).send(error);
    });
}

function getAddressBalance (address) {
    return infuraProvider.getBalance(address).then((balance) => {
        // balance is a BigNumber (in wei);
        const etherString = ethers.utils.formatEther(balance);
        return etherString;
    }).catch((error) => {
        return null;
    });
}

function getTransactionCount (address) {
    return infuraProvider.getTransactionCount(address).then((nonce) => {
        return nonce;
    }).catch((error) => {
        return null;
    });
}