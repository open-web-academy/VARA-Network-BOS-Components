//States for data management
const [ftData, setFtData] = useState(undefined);
const [ftName, setftName] = useState(undefined);
const [ftSymbol, setFtSymbol] = useState(undefined);
const [ftDecimals, setFtDecimals] = useState(undefined);
const [ftTotal, setFtTotal] = useState(undefined);
const [isContract, setIsContract] = useState(false);
const [contract, setContract] = useState("");
const [canMint, setCanMint] = useState(false);
const [balance, setBalance] = useState(undefined);
const [account, setAccount] = useState(undefined);
const [inputToken, setInputToken] = useState(0);

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

//Html tags with pre-applied css styles
const App = styled.div`
  --margin-app: clamp(16px, 4vw, 24px);
  --h-footer: 60px;
  --bg-card: rgb(25, 25, 25, .9);
  --primary: #0fffc7;
  --gradient: linear-gradient(to right, #22463d, #00f0b8);

  display: grid;
  place-items: center;
  place-content: center;
  min-height: calc(100dvh - var(--h-footer));
  background: linear-gradient(to top right, #fff, #f5f5f7);

  * {
    font-family: 'system-ui','Inter', 'Space Grotesk' !important;
  }

  .wrapper {
    background: var(--bg-card);
    border-radius: .3rem;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    max-width: 500px;

    span {
      color: #fff
    }
  }

  ::-moz-selection { /* Code for Firefox */
    background: #ccf0e7;
  }
  
  ::selection {
    background: #ccf0e7;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`,
  Input = styled.div`
    display: flex;
    gap: 10px;
    border-radius: .75rem;
    padding: 5px;
    background: #fff;
    box-shadow: 0 0 10px -5px rgb(0,0,0,.4);

    input {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      border: none;
      height: 40px;
      font-size: 24px;
      font-weight: 500;
      padding-right: 0;
      margin: 5px;
      
      &::placeholder {
        font-size: 24px;
      }
      
      &:focus {
        box-shadow: none;
      }
    }
  `,
  Btn = styled.button`
    display: inlin-block;
    background: var(--primary);
    border: none;
    border-radius: .7rem;
    font-weight: 600;
    padding-inline: 10px;
    min-height: 45px;

    :hover {
      opacity: .9;
      filter: grayscale(0.5);
    }
  `,
  Footer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--h-footer);
  padding-inline: var(--margin-app);
  padding-block: 5px;
  background: var(--primary);

  a {
    color: #000;
    background: #fff;
    padding: 10px 30px;
    border-radius: .75rem;
    translate: 0 -20px;
    box-shadow: 0 0 10px -5px rgb(0,0,0,.4);
  }
  
  #vara-icon {
    width: 50px;
    height: 50px;
  }
`;

return (
  <VaraNetwork.Wrapper>
    <App>
      {account ? (
        isContract ? (
          <>
            <div className="wrapper">
              <h3 className="text-center mb-4 text-light fw-bold">
                Mint Fungible Token
              </h3>
              <div className="mb-4 d-flex flex-row gap-2 align-items-center">
                <p className="text-light m-0">Account:</p>
                <VaraNetwork.Identicon size={30} />
                <p className="text-light m-0 fw-semibold">
                  {account.meta.name}
                </p>
              </div>
              <Input>
                <input
                  value={inputToken}
                  type="number"
                  onChange={(e) => setInputToken(e.target.value)}
                />
              </Input>

              {balance ? (
                <>
                  <div className="space-between mt-2" style={{ gap: "10px" }}>
                    <span>My balance:</span>
                    <span className="fw-bold">
                      {balance} {ftSymbol}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="fw-bold">You have no balance</span>
                </>
              )}
              <div className="space-between mt-2" style={{ gap: "10px" }}>
                <span>Total supply:</span>
                <span className="fw-bold">
                  {ftTotal} {ftSymbol}
                </span>
              </div>
              {canMint ? (
                <VaraNetwork.SailsInteraction
                  trigger={({ signTransaction, sendQuery }) => (
                    <>
                      <Btn
                        className="mt-4"
                        onClick={() => {
                          const data = {
                            contractId: contract,
                            idl: idl,
                            serviceName: "Vft",
                            methodName: "Mint",
                            args: [
                              account.decodedAddress,
                              parseInt(inputToken),
                            ],
                          };
                          const tr = signTransaction(data);
                          tr.then((res) => {
                            if (res) {
                              const data = {
                                contractId: contract,
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
                              const infoBalance = sendQuery({
                                methodName: "BalanceOf",
                                args: [account.decodedAddress],
                                ...data,
                              });
                              infoBalance.then((res) => {
                                setBalance(parseInt(res));
                              });
                            }
                          });
                        }}
                      >
                        Submit
                      </Btn>
                    </>
                  )}
                />
              ) : (
                <h4 className="text-center text-white my-2">
                  You do not have Mint permissions within this contract
                </h4>
              )}
            </div>
          </>
        ) : (
          <div className="wrapper">
            <h3 className="text-center text-white mb-5">
              The contract you wrote is not VFT Extended try again
            </h3>
            <Btn onClick={() => setAccount(undefined)}>Go Back</Btn>
          </div>
        )
      ) : (
        <div className="wrapper">
          <h3 className="text-center text-white mb-5">
            Welcome to the example of interaction with a VFT Extended contract
            in VARA Network
          </h3>
          <h5 className="text-center text-white mb-2">
            Write the address of your VFT Extended contract
          </h5>
          <Input className="mb-3">
            <input
              onChange={(e) => setContract(e.target.value)}
              value={contract}
              type="text"
            />
          </Input>
          <VaraNetwork.SailsInteraction
            trigger={({ sendQuery, getAccountInfo }) => (
              <>
                <Btn
                  onClick={() => {
                    let varaAccount = getAccountInfo();
                    setAccount(varaAccount);
                    const data = {
                      contractId: contract,
                      idl: idl,
                      serviceName: "Vft",
                    };
                    const infoName = sendQuery({
                      methodName: "Name",
                      ...data,
                    });
                    infoName
                      .then((res) => {
                        setftName(res);
                      })
                      .catch((e) => {
                        setIsContract(false);
                        return;
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
                      console.log("Minters", res);
                      setCanMint(res.includes(varaAccount.decodedAddress));
                    });
                    const infoBalance = sendQuery({
                      methodName: "BalanceOf",
                      args: [varaAccount.decodedAddress],
                      ...data,
                    });
                    infoBalance.then((res) => {
                      setBalance(parseInt(res));
                    });
                    setIsContract(true);
                  }}
                >
                  Start widget
                </Btn>
              </>
            )}
          />
        </div>
      )}
      <Footer>
        <a
          href="https://vara.network/"
          className="fw-bold"
          target="_blank"
          title="vara network"
        >
          Powered by
          <img
            height="50px"
            src={`https://ipfs.near.social/ipfs/bafkreibjwxaoctoxglepnln5hgos3pvwaih3eidwrupjlmffoivfgarwfa`}
            alt="uploaded"
          />
        </a>
      </Footer>
    </App>
  </VaraNetwork.Wrapper>
);
