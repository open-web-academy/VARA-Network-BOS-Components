/*
To use the VFT Extended contract you need to be the owner 
of the contract or have permissions to be able to mint it.
*/
// wrote below your contract address
const contractId =
  "0x420a28c2f9c0567d9721e6ca9f1d76606362f85f8ae74fd15996e171e64c9709";

//VFT Extended Contract IDL
const idl = `
constructor {
  New : (name: str, symbol: str, decimals: u8);
};

service Vft {
  Burn : (from: actor_id, value: u256) -> bool;
  GrantAdminRole : (to: actor_id) -> null;
  GrantBurnerRole : (to: actor_id) -> null;
  GrantMinterRole : (to: actor_id) -> null;
  Mint : (to: actor_id, value: u256) -> bool;
  RevokeAdminRole : (from: actor_id) -> null;
  RevokeBurnerRole : (from: actor_id) -> null;
  RevokeMinterRole : (from: actor_id) -> null;
  Approve : (spender: actor_id, value: u256) -> bool;
  Transfer : (to: actor_id, value: u256) -> bool;
  TransferFrom : (from: actor_id, to: actor_id, value: u256) -> bool;
  query Admins : () -> vec actor_id;
  query Burners : () -> vec actor_id;
  query Minters : () -> vec actor_id;
  query Allowance : (owner: actor_id, spender: actor_id) -> u256;
  query BalanceOf : (account: actor_id) -> u256;
  query Decimals : () -> u8;
  query Name : () -> str;
  query Symbol : () -> str;
  query TotalSupply : () -> u256;

  events {
    Minted: struct { to: actor_id, value: u256 };
    Burned: struct { from: actor_id, value: u256 };
    Approval: struct { owner: actor_id, spender: actor_id, value: u256 };
    Transfer: struct { from: actor_id, to: actor_id, value: u256 };
  }
};
`;
//States for data management
const [ftData, setFtData] = useState(undefined);
const [ftName, setftName] = useState(undefined);
const [ftSymbol, setFtSymbol] = useState(undefined);
const [ftDecimals, setFtDecimals] = useState(undefined);
const [ftTotal, setFtTotal] = useState(undefined);
const [ftMinters, setFtMinters] = useState(undefined);
const [account, setAccount] = useState(undefined);
const [response, setResponse] = useState(undefined);

return (
  <>
    <VaraNetwork.Wrapper>
      <div className="border border-black p-3 rounded">
        <h4 className="mb-2">Vara Interaction Functions</h4>
        <div className="d-flex flex-row gap-3">
          <VaraNetwork.SailsInteraction
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
          <VaraNetwork.SailsInteraction
            trigger={({ signTransaction, getAccountInfo, sendQuery }) => (
              <>
                <button
                  onClick={() => {
                    const account = getAccountInfo().decodedAddress;
                    const value = 10;
                    const data = {
                      contractId: contractId,
                      idl: idl,
                      serviceName: "Vft",
                      methodName: "Mint",
                      args: [account, value],
                    };
                    const tr = signTransaction(data);
                    tr.then((res) => {
                      console.log(res);
                      setResponse(res ? "Minted" : "Error");
                      if (res) {
                        const data = {
                          contractId: contractId,
                          idl: idl,
                          serviceName: "Vft",
                        };
                        const infoTotal = sendQuery({
                          methodName: "TotalSupply",
                          ...data,
                        });
                        infoTotal.then((res) => {
                          setFtTotal(parseInt(res));
                        });
                        const infoMinters = sendQuery({
                          methodName: "Minters",
                          ...data,
                        });
                        infoMinters.then((res) => {
                          setFtMinters(res);
                        });
                      }
                    });
                  }}
                >
                  Test Transaction
                </button>
              </>
            )}
          />
          <VaraNetwork.SailsInteraction
            trigger={({ sendQuery }) => (
              <>
                <button
                  onClick={() => {
                    setFtData(true);
                    const data = {
                      contractId: contractId,
                      idl: idl,
                      serviceName: "Vft",
                    };
                    const infoName = sendQuery({ methodName: "Name", ...data });
                    infoName.then((res) => {
                      setftName(res);
                    });
                    const infoSymbol = sendQuery({
                      methodName: "Symbol",
                      ...data,
                    });
                    infoSymbol.then((res) => {
                      setFtSymbol(res);
                    });
                    const infoDecimals = sendQuery({
                      methodName: "Decimals",
                      ...data,
                    });
                    infoDecimals.then((res) => {
                      setFtDecimals(res);
                    });
                    const infoTotal = sendQuery({
                      methodName: "TotalSupply",
                      ...data,
                    });
                    infoTotal.then((res) => {
                      setFtTotal(parseInt(res));
                    });
                    const infoMinters = sendQuery({
                      methodName: "Minters",
                      ...data,
                    });
                    infoMinters.then((res) => {
                      setFtMinters(res);
                    });
                  }}
                >
                  {ftData ? "Reload Data" : "Test Query"}
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
        {response && (
          <div className="border border-black p-3 rounded">
            <h4 className="mb-2">Response</h4>
            <p className="m-0 fw-bold">{response}</p>
          </div>
        )}
        {ftData && (
          <div className="border border-black p-3 rounded mt-2">
            <h4 className="mb-2">Fungible Token Contract Data</h4>
            <div>
              <p>
                Token Name: <b>{ftName}</b>
              </p>
              <p>
                Symbol: <b>{ftSymbol}</b>
              </p>
              <p>
                Decimals: <b>{ftDecimals}</b>
              </p>
              <p>
                Total Supply: <b>{ftTotal}</b>
              </p>
              {ftMinters && (
                <div>
                  <p>Minters:</p>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Account</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ftMinters.map((data) => {
                        console.log(data);
                        return (
                          <tr>
                            <td>{data}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </VaraNetwork.Wrapper>
  </>
);
