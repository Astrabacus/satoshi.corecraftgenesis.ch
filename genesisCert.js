const fs = require('fs');
const { exec } = require('child_process');

// Beispiel: RPC-Aufruf über curl
const rpcCall = `curl --user rpcuser:rpcpassword --data-binary '{"jsonrpc":"1.0","id":"genesis","method":"getblockchaininfo","params":[]}' -H 'content-type:text/plain;' http://127.0.0.1:8332/`;

exec(rpcCall, (error, stdout, stderr) => {
  if (error) {
    console.error(`Fehler beim RPC-Aufruf: ${error.message}`);
    return;
  }

  const info = JSON.parse(stdout);
  const cert = {
    node: "GenesisProof",
    validated_up_to: info.blocks,
    chain: info.chain,
    timestamp: new Date().toISOString(),
    message: "Dieser Node hat die Blockchain ab Genesis validiert."
  };

  fs.writeFileSync("genesis-cert.json", JSON.stringify(cert, null, 2));
  console.log("Zertifikat erstellt: genesis-cert.json");
});
