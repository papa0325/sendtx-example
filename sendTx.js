async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);

    const myAddress = '0xe5838d06923dA0D1346DCf28E066D2d61C7B3f0C';

    const nonce = await web3.eth.getTransactionCount(myAddress, "latest");

    const transaction = {
        'to': '0xCEa686dfd92Ee8884B7A6c55Ed028341E2c7e898',
        'value': 1000000000000000000,
        'gas': 30000,
        //'maxFeePerGas': 1000000108,
        'nonce': nonce,
    }

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
        if (!error) {
            console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!")
        } else {
            console.log("❗ Something went wrong while submitting your transaction:", error)
        }
    })
}

main();