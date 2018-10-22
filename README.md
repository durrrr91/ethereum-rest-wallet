The project is hardcoded to work on Rinkeby test network
The project depends on infura.io to connect to the Rinkeby test network

**Create wallet**

    POST http://localhost:8080/api/wallets

Returns 

    {
    "id": "0",
    "privateKey": "0x1dcaed3972eca9690f4eda350a0124cd9dc0d1ddffd7bb724edc29e28622c2c8",
    "publicAddress": "0x084c49c46C2492EC63e95D3BE97d90DcffE4dF64"
    }

**Get all wallets** 

    GET http://localhost:8080/api/wallets
Returns

    [
    {
        "id": "0",
        "privateKey": "0x1dcaed3972eca9690f4eda350a0124cd9dc0d1ddffd7bb724edc29e28622c2c8",
        "publicAddress": "0x084c49c46C2492EC63e95D3BE97d90DcffE4dF64"
    },
    {
        "id": "1",
        "privateKey": "0x58c1897158f2ce6c28f85b137d7cd3a52d0886006c9be35747e6339787233c1f",
        "publicAddress": "0x2Fafa62c51c7fbA537623cE6804232BcbA440d0C"
    }
    ]

**Get address balance **

    GET http://localhost:8080/api/getBalance/:address
    GET http://localhost:8080/api/getBalance/0x0e08e025f84eB60c45397C69fd726CA1432C782e

Returns (formatted from Wei to Ether)

    "2.681452773"

**Transaction**

    POST http://localhost:8080/api/transaction
- privateKey (sender)
- amount (in Ether)
- destination (receiver address)

Example POST:

    {
	"privateKey" : "a441798f63fbcca04272809bb523d7cc7f5e03fa651cbceb0585ad7a26abfe69",
	"amount": "0.001", 
	"destination": "0x0d215dC4bB0d75fD99E36238E0bf4261c2527385"
	}
Returns:

    {
    "nonce": 11,
    "gasPrice": {
        "_hex": "0x04a817c800"
    },
    "gasLimit": {
        "_hex": "0x5208"
    },
    "to": "0x0d215dC4bB0d75fD99E36238E0bf4261c2527385",
    "value": {
        "_hex": "0x038d7ea4c68000"
    },
    "data": "0x",
    "chainId": 4,
    "v": 44,
    "r": "0xa5fa91032f18897f6a2c8376c1ad30166c38a0dd3d65cac1329c416fd4cf3401",
    "s": "0x7878b45d9d8707349c6c970c8f952995a3e036663105ce4626bd47558cf7e9af",
    "from": "0x0e08e025f84eB60c45397C69fd726CA1432C782e",
    "hash": "0xe603a18e9d27902e96f6c642717a8c849c9f968da94ca3b012cca7fbbfe2b871"
    }

**Preloaded Rinkeby Accounts**

    // const privateKeyWithMoney = "a441798f63fbcca04272809bb523d7cc7f5e03fa651cbceb0585ad7a26abfe69";
    // const publicAddressWithMoney = "0x0e08e025f84eB60c45397C69fd726CA1432C782e";
    // const destinationThatIOwn = "0x0d215dC4bB0d75fD99E36238E0bf4261c2527385";
