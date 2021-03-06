const { EcdsaParty2 } = require('@kzen-networks/thresh-sig');
const crypto = require('crypto');

const P1_ENDPOINT = 'http://localhost:8000';

(async () => {
    console.log("init party2")
    const party2 = new EcdsaParty2(P1_ENDPOINT);
    console.log("generate master key")
    const party2MasterKeyShare = await party2.generateMasterKey();
    console.log("get child share")
    const party2ChildShare = party2.getChildShare(party2MasterKeyShare, 0, 0);
    console.log("calculate hash")
    const msgHash = crypto.createHash('sha256').update('some message').digest();
    console.log("sign")
    const signature = await party2.sign(msgHash, party2ChildShare, 0, 0);
    console.log(JSON.stringify(signature));
    // {"r": <32-bytes-hex>,"s": <32-bytes-hex>,"recid": <0 or 1>}
})();

setInterval(() => console.log("running"), 1000);