const [ftData, setFtData] = useState(undefined);
const [balance, setBalance] = useState(undefined);
const [account, setAccount] = useState(undefined);
const [inputToken, setInputToken] = useState(0);
const contract =
  "0xeb4a8f9f5b11f644812306647a4c15161c90813a5451dc35fa24feb10dcb73d9";
const contractData =
  "00010001000000000001030000000107000000000000000108000000a90b3400081466745f696f28496e6974436f6e66696700000c01106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120646563696d616c73080108753800000400000502000800000503000c081466745f696f204654416374696f6e000118104d696e74040010011075313238000000104275726e040010011075313238000100205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380002001c417070726f7665080108746f14011c4163746f724964000118616d6f756e74100110753132380003002c546f74616c537570706c790004002442616c616e63654f66040014011c4163746f724964000500001000000507001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d0000180000032000000008001c081466745f696f1c46544576656e74000110205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380000001c417070726f76650c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380001002c546f74616c537570706c790400100110753132380002001c42616c616e63650400100110753132380003000020081466745f696f3c496f46756e6769626c65546f6b656e00001801106e616d65040118537472696e6700011873796d626f6c040118537472696e67000130746f74616c5f737570706c791001107531323800012062616c616e6365732401505665633c284163746f7249642c2075313238293e000128616c6c6f77616e6365732c01905665633c284163746f7249642c205665633c284163746f7249642c2075313238293e293e000120646563696d616c730801087538000024000002280028000004081410002c00000230003000000408142400";

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
      {ftData ? (
        <>
          <div className="wrapper">
            <h3 className="text-center mb-4 text-light fw-bold">
              Mint Fungible Token
            </h3>
            <div className="mb-4 d-flex flex-row gap-2 align-items-center">
              <p className="text-light m-0">Account:</p>
              <VaraNetwork.Identicon size={30} />
              <p className="text-light m-0 fw-semibold">{account.meta.name}</p>
            </div>
            <VaraNetwork.Interaction
              trigger={({ readState }) => (
                <>
                  <button
                    type="button"
                    className="btn btn-success mb-3 fw-bold"
                    onClick={() => {
                      const info = readState(contract, contractData, "");
                      info.then((res) => {
                        setBalance(
                          res.balances.find(
                            (data) => data[0] == account.decodedAddress
                          )
                        );
                      });
                    }}
                  >
                    Update my balance
                  </button>
                </>
              )}
            />
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
                    {balance[1]} {ftData.symbol}
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
                {ftData.totalSupply} {ftData.symbol}
              </span>
            </div>
            <VaraNetwork.Interaction
              trigger={({ signTransaction }) => (
                <>
                  <Btn
                    className="mt-4"
                    onClick={() => {
                      signTransaction(
                        contract,
                        contractData,
                        { mint: inputToken },
                        899819245,
                        0
                      );
                    }}
                  >
                    Submit
                  </Btn>
                </>
              )}
            />
          </div>
        </>
      ) : (
        <div className="wrapper">
          <h3 className="text-center text-white mb-5">
            Welcome to the example of interaction with a FT contract in VARA
            Network
          </h3>
          <VaraNetwork.Interaction
            trigger={({ readState, getAccountInfo }) => (
              <>
                <Btn
                  onClick={() => {
                    const info = readState(contract, contractData, "");
                    info.then((res) => {
                      setFtData(res);
                      let varaAccount = getAccountInfo();
                      setAccount(varaAccount);
                      setBalance(
                        res.balances.find(
                          (data) => data[0] == varaAccount.decodedAddress
                        )
                      );
                    });
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
