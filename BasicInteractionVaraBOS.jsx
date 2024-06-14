const contract =
  "0xeb4a8f9f5b11f644812306647a4c15161c90813a5451dc35fa24feb10dcb73d9";
const contractData =
  "00010001000000000001030000000107000000000000000108000000a90b3400081466745f696f28496e6974436f6e66696700000c01106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120646563696d616c73080108753800000400000502000800000503000c081466745f696f204654416374696f6e000118104d696e74040010011075313238000000104275726e040010011075313238000100205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380002001c417070726f7665080108746f14011c4163746f724964000118616d6f756e74100110753132380003002c546f74616c537570706c790004002442616c616e63654f66040014011c4163746f724964000500001000000507001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d0000180000032000000008001c081466745f696f1c46544576656e74000110205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380000001c417070726f76650c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380001002c546f74616c537570706c790400100110753132380002001c42616c616e63650400100110753132380003000020081466745f696f3c496f46756e6769626c65546f6b656e00001801106e616d65040118537472696e6700011873796d626f6c040118537472696e67000130746f74616c5f737570706c791001107531323800012062616c616e6365732401505665633c284163746f7249642c2075313238293e000128616c6c6f77616e6365732c01905665633c284163746f7249642c205665633c284163746f7249642c2075313238293e293e000120646563696d616c730801087538000024000002280028000004081410002c00000230003000000408142400";

const [ftData, setFtData] = useState(undefined);
const [account, setAccount] = useState(undefined);
return (
  <>
    <VaraNetwork.Wrapper>
      <div className="border border-black p-3 rounded">
        <h4 className="mb-2">Vara Interaction Functions</h4>
        <div className="d-flex flex-row gap-3">
          <VaraNetwork.Interaction
            trigger={({ signTransaction }) => (
              <>
                <button
                  onClick={() => {
                    signTransaction(
                      contract,
                      contractData,
                      { mint: 10 },
                      899819245,
                      0
                    );
                  }}
                >
                  Test Sign Transaction
                </button>
              </>
            )}
          />
          <VaraNetwork.Interaction
            trigger={({ readState }) => (
              <>
                <button
                  onClick={() => {
                    const info = readState(contract, contractData, "");
                    info.then((res) => {
                      console.log("ReadState", res);
                      setFtData(res);
                    });
                  }}
                >
                  {ftData ? "Reload Data" : "Test Read State"}
                </button>
              </>
            )}
          />
          <VaraNetwork.Interaction
            trigger={({ getAccountInfo }) => (
              <>
                <button
                  onClick={() => {
                    setAccount(getAccountInfo());
                  }}
                >
                  {account
                    ? "Reload Account Information"
                    : "Get Account Information"}
                </button>
              </>
            )}
          />
        </div>
      </div>
      <div className="mt-4">
        {account && (
          <div className="border border-black p-3 rounded">
            <h4 className="mb-2">Account Data</h4>
            <div className="d-flex flex-row gap-2">
              <VaraNetwork.Identicon size={30} />
              <p className="m-0 fw-bold">{account.meta.name}</p>
            </div>
            <p className="fw-semibold">{account.decodedAddress}</p>
          </div>
        )}
        {ftData && (
          <div className="border border-black p-3 rounded mt-2">
            <h4 className="mb-2">Fungible Token Contract Data</h4>
            <div>
              <p>
                Token Name: <b>{ftData.name}</b>
              </p>
              <p>
                Symbol: <b>{ftData.symbol}</b>
              </p>
              <p>
                Decimals: <b>{ftData.decimals}</b>
              </p>
              <p>
                Total Supply: <b>{ftData.totalSupply}</b>
              </p>
              <div>
                <p>Balances:</p>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Account</th>
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ftData.balances.map((data) => {
                      return (
                        <tr>
                          <td>{data[0]}</td>
                          <td>{data[1]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </VaraNetwork.Wrapper>
  </>
);
