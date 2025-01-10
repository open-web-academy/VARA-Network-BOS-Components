//States for data management
const [isContract, setIsContract] = useState(false);
const [contract, setContract] = useState("");
const [canMint, setCanMint] = useState(false);
const [account, setAccount] = useState(undefined);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [reference, setReference] = useState("");
const [nftData, setNftData] = useState(undefined);
State.init({ image: undefined });

//VNFT Extended Contract IDL
const idl = `
type TokenMetadata = struct {
  name: str,
  description: str,
  media: str,
  reference: str,
};

constructor {
  New : (name: str, symbol: str);
};

service Vnft {
  Burn : (from: actor_id, token_id: u256) -> null;
  GrantAdminRole : (to: actor_id) -> null;
  GrantBurnerRole : (to: actor_id) -> null;
  GrantMinterRole : (to: actor_id) -> null;
  Mint : (to: actor_id, token_metadata: TokenMetadata) -> null;
  RevokeAdminRole : (from: actor_id) -> null;
  RevokeBurnerRole : (from: actor_id) -> null;
  RevokeMinterRole : (from: actor_id) -> null;
  Approve : (approved: actor_id, token_id: u256) -> null;
  Transfer : (to: actor_id, token_id: u256) -> null;
  TransferFrom : (from: actor_id, to: actor_id, token_id: u256) -> null;
  query Admins : () -> vec actor_id;
  query Burners : () -> vec actor_id;
  query Minters : () -> vec actor_id;
  query TokenId : () -> u256;
  query TokenMetadataById : (token_id: u256) -> opt TokenMetadata;
  query TokensForOwner : (owner: actor_id) -> vec struct { u256, TokenMetadata };
  query BalanceOf : (owner: actor_id) -> u256;
  query GetApproved : (token_id: u256) -> actor_id;
  query Name : () -> str;
  query OwnerOf : (token_id: u256) -> actor_id;
  query Symbol : () -> str;

  events {
    Minted: struct { to: actor_id, token_metadata: TokenMetadata };
    Burned: struct { from: actor_id, token_id: u256 };
    Transfer: struct { from: actor_id, to: actor_id, token_id: u256 };
    Approval: struct { owner: actor_id, approved: actor_id, token_id: u256 };
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

  .wrapper {
    background: var(--bg-card);
    border-radius: .3rem;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    width: 1000px;

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
  `;

return (
  <VaraNetwork.Wrapper>
    <App>
      {account ? (
        isContract ? (
          <>
            <div className="wrapper">
              <h3 className="text-center mb-4 text-light fw-bold">
                Mint Non Fungible Tokens
              </h3>
              {account && (
                <div className="mb-4 d-flex flex-row gap-2 align-items-center">
                  <p className="text-light m-0">Account:</p>
                  <VaraNetwork.Identicon size={30} />
                  <p className="text-light m-0 fw-semibold">
                    {account.meta.name}
                  </p>
                </div>
              )}

              <div className="d-flex flex-row gap-2">
                <div className="w-50 px-2 d-flex flex-column align-items-center justify-content-center">
                  {state.image ? (
                    <div>
                      <img
                        className="rounded mx-auto d-block w-75 mb-2"
                        src={`https://ipfs.near.social/ipfs/${state.image.cid}`}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <IpfsImageUpload
                    className="btn btn-success fw-bold px-5"
                    image={state.image}
                  />
                </div>
                <div className="w-50">
                  <div className=" mb-2">
                    <p className="text-light m-0">Name:</p>
                    <Input>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Input>
                  </div>
                  <div className=" mb-2">
                    <p className="text-light m-0">Description:</p>
                    <Input>
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Input>
                  </div>
                  <div className=" mb-2">
                    <p className="text-light m-0">Reference:</p>
                    <Input>
                      <input
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                      />
                    </Input>
                  </div>
                  {canMint ? (
                    <VaraNetwork.SailsInteraction
                      trigger={({ signTransaction, sendQuery }) => (
                        <>
                          <Btn
                            className="mt-4 w-100"
                            onClick={() => {
                              const data = {
                                contractId: contract,
                                idl: idl,
                                serviceName: "Vnft",
                                methodName: "Mint",
                                args: [
                                  account.decodedAddress,
                                  {
                                    name: name,
                                    description: description,
                                    media: state.image.cid,
                                    reference: reference,
                                  },
                                ],
                              };
                              const tr = signTransaction(data);
                              tr.then((res) => {
                                const data = {
                                  contractId: contract,
                                  idl: idl,
                                  serviceName: "Vnft",
                                };
                                const infoTokens = sendQuery({
                                  methodName: "TokensForOwner",
                                  args: [varaAccount.decodedAddress],
                                  ...data,
                                });
                                infoTokens.then((res) => {
                                  setNftData(res);
                                });
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
              </div>
            </div>

            <div className="wrapper mt-3">
              <h3 className="text-center mb-4 text-light fw-bold">My NFTs</h3>
              {nftData.length > 0 ? (
                <div className="d-flex flex-row flex-wrap justify-content-start gap-4">
                  {nftData.map((data) => {
                    //The NFTs obtained from the contract are shown
                    return (
                      <div className="d-flex align-content-between">
                        <div
                          className="card mx-auto"
                          style={{ width: "18rem" }}
                        >
                          <img
                            src={`https://ipfs.near.social/ipfs/${data[1].media}`}
                            className="card-img-top"
                            alt="NFT"
                          />
                          <div className="card-body d-flex flex-column ">
                            <h5 className="card-title">{data[1].name}</h5>
                            <p className="card-text">
                              Description: <b>{data[1].description}</b>
                            </p>
                            <p className="card-text text-truncate">
                              Owner: <b>{account.decodedAddress}</b>
                            </p>
                            <p className="card-text">
                              Token ID: <b>{parseInt(data[0])}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <h5 className="text-center text-light fw-bold">
                    No NFTs have been created, you can generate one above
                  </h5>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="wrapper">
            <h3 className="text-center text-white mb-5">
              The contract you wrote is not VNFT Extended try again
            </h3>
            <Btn onClick={() => setAccount(undefined)}>Go Back</Btn>
          </div>
        )
      ) : (
        <div className="wrapper">
          <h3 className="text-center text-white mb-5">
            Welcome to the example of interaction with a VNFT Extended contract
            in VARA Network
          </h3>
          <h5 className="text-center text-white mb-2">
            Write the address of your VNFT Extended contract
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
                      serviceName: "Vnft",
                    };
                    const infoTokens = sendQuery({
                      methodName: "TokensForOwner",
                      args: [varaAccount.decodedAddress],
                      ...data,
                    });
                    infoTokens
                      .then((res) => {
                        console.log(res);
                        setNftData(res);
                      })
                      .catch((e) => {
                        setIsContract(false);
                        return;
                      });
                    const infoMinters = sendQuery({
                      methodName: "Minters",
                      ...data,
                    });
                    infoMinters.then((res) => {
                      setCanMint(res.includes(varaAccount.decodedAddress));
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
    </App>
  </VaraNetwork.Wrapper>
);
