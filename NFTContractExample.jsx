//States are defined for data management within the component
const [nftData, setNftData] = useState(undefined);
const [balance, setBalance] = useState(undefined);
const [account, setAccount] = useState(undefined);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [reference, setReference] = useState("");
State.init({ image: undefined });

//The NFT contract with which we are going to interact is defined
const contract =
  "0xb65348c5e6245b4297334d79b49195ee96530de4262878b5778262373a964ec0";
//The contract metadata is assigned
const contractData =
  "0002000100000000000106000000010b00000000000000010d000000010e0000000120680008186e66745f696f1c496e69744e66740000080128636f6c6c656374696f6e040128436f6c6c656374696f6e000118636f6e6669670c0118436f6e66696700000408186e66745f696f28436f6c6c656374696f6e00000801106e616d65080118537472696e6700012c6465736372697074696f6e080118537472696e6700000800000502000c08186e66745f696f18436f6e66696700000401386d61785f6d696e745f636f756e741001304f7074696f6e3c753132383e00001004184f7074696f6e04045401140108104e6f6e6500000010536f6d6504001400000100001400000507001808186e66745f696f244e6674416374696f6e000118104d696e74080108746f1c011c4163746f724964000138746f6b656e5f6d65746164617461280134546f6b656e4d65746164617461000000104275726e040120746f6b656e5f696414011c546f6b656e4964000100205472616e73666572080108746f1c011c4163746f724964000120746f6b656e5f696414011c546f6b656e49640002001c417070726f7665080108746f1c011c4163746f724964000120746f6b656e5f696414011c546f6b656e4964000300204765744f776e6572040120746f6b656e5f696414011c546f6b656e49640004003c436865636b4966417070726f766564080108746f1c011c4163746f724964000120746f6b656e5f696414011c546f6b656e4964000500001c10106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004002001205b75383b2033325d0000200000032000000024002400000503002808186e66745f696f34546f6b656e4d6574616461746100001001106e616d65080118537472696e6700012c6465736372697074696f6e080118537472696e670001146d65646961080118537472696e670001247265666572656e6365080118537472696e6700002c08186e66745f696f204e66744576656e74000118184d696e746564080108746f1c011c4163746f724964000138746f6b656e5f6d65746164617461280134546f6b656e4d65746164617461000000144275726e74040120746f6b656e5f696414011c546f6b656e49640001002c5472616e736665727265640c011066726f6d1c011c4163746f724964000108746f1c011c4163746f724964000120746f6b656e5f696414011c546f6b656e496400020020417070726f7665640c01146f776e65721c011c4163746f724964000140617070726f7665645f6163636f756e741c011c4163746f724964000120746f6b656e5f696414011c546f6b656e4964000300144f776e65720801146f776e65721c011c4163746f724964000120746f6b656e5f696414011c546f6b656e49640004003c436865636b4966417070726f7665640c0108746f1c011c4163746f724964000120746f6b656e5f696414011c546f6b656e4964000120617070726f766564300110626f6f6c000500003000000500003408186e66745f696f28537461746551756572790001240c416c6c00000018436f6e66696700010028436f6c6c656374696f6e000200144f776e65720003003843757272656e74546f6b656e4964000400244f776e657242794964040120746f6b656e5f696414011c546f6b656e496400050038546f6b656e417070726f76616c73040120746f6b656e5f696414011c546f6b656e496400060034546f6b656e4d65746164617461040120746f6b656e5f696414011c546f6b656e49640007002c4f776e6572546f6b656e730401146f776e65721c011c4163746f724964000800003808186e66745f696f2853746174655265706c790001240c416c6c04003c0114537461746500000018436f6e66696704000c0118436f6e66696700010028436f6c6c656374696f6e0400040128436f6c6c656374696f6e000200144f776e657204001c011c4163746f7249640003003843757272656e74546f6b656e4964040014011c546f6b656e4964000400244f776e65724279496404005c013c4f7074696f6e3c4163746f7249643e00050038546f6b656e417070726f76616c7304005c013c4f7074696f6e3c4163746f7249643e00060034546f6b656e4d6574616461746104006001544f7074696f6e3c546f6b656e4d657461646174613e0007002c4f776e6572546f6b656e7304006401504f7074696f6e3c5665633c546f6b656e49643e3e000800003c08186e66745f696f145374617465000020012c6f776e65725f62795f696440015c5665633c28546f6b656e49642c204163746f724964293e00013c746f6b656e5f617070726f76616c7340015c5665633c28546f6b656e49642c204163746f724964293e000150746f6b656e5f6d657461646174615f62795f69644801745665633c28546f6b656e49642c20546f6b656e4d65746164617461293e000140746f6b656e735f666f725f6f776e65725001705665633c284163746f7249642c205665633c546f6b656e49643e293e000120746f6b656e5f696414011c546f6b656e49640001146f776e65721c011c4163746f724964000128636f6c6c656374696f6e040128436f6c6c656374696f6e000118636f6e6669670c0118436f6e66696700004000000244004400000408141c00480000024c004c0000040814280050000002540054000004081c58005800000214005c04184f7074696f6e040454011c0108104e6f6e6500000010536f6d6504001c00000100006004184f7074696f6e04045401280108104e6f6e6500000010536f6d6504002800000100006404184f7074696f6e04045401580108104e6f6e6500000010536f6d650400580000010000";

//HTML tags are defined that will be used in the component
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
      {nftData ? (
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
                <VaraNetwork.Interaction
                  trigger={({ signTransaction }) => (
                    <>
                      <Btn
                        className="mt-4 w-100"
                        disabled={!account}
                        onClick={() => {
                          //The signTransaction method is executed to create the NFT
                          signTransaction(
                            contract,
                            contractData,
                            {
                              Mint: {
                                to: account.decodedAddress,
                                token_metadata: {
                                  name: name,
                                  description: description,
                                  media: state.image.cid,
                                  reference: reference,
                                },
                              },
                            },
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
            </div>
          </div>

          <div className="wrapper mt-3">
            <h3 className="text-center mb-4 text-light fw-bold">NFT Gallery</h3>
            <VaraNetwork.Interaction
              trigger={({ readState, getAccountInfo }) => (
                <div className="d-flex justify-content-center mb-3">
                  <Btn
                    className="w-25"
                    onClick={() => {
                      //The NFTs of the contract are updated
                      let info = readState(contract, contractData, "all");
                      info.then((res) => {
                        console.log(res.all);
                        let arr = [];
                        for (
                          let i = 0;
                          i < res.all.tokenMetadataById.length;
                          i++
                        ) {
                          arr.push(
                            res.all.tokenMetadataById[i].concat(
                              res.all.ownerById[i][1]
                            )
                          );
                        }
                        setNftData(arr.sort((a, b) => a[0] - b[0]));
                      });
                    }}
                  >
                    Update NFTs
                  </Btn>
                </div>
              )}
            />
            {nftData.length > 0 ? (
              <div className="d-flex flex-row flex-wrap justify-content-start gap-4">
                {nftData.map((data) => {
                  //The NFTs obtained from the contract are shown
                  return (
                    <div className="d-flex align-content-between">
                      <div className="card mx-auto" style={{ width: "18rem" }}>
                        <img
                          src={`https://ipfs.near.social/ipfs/${data[1].media}`}
                          className="card-img-top"
                          alt="NFT"
                        />
                        <div className="card-body d-flex flex-column ">
                          <h5 className="card-title">{data[1].name}</h5>
                          <p className="card-text">{data[1].description}</p>
                          <p className="card-text text-truncate">
                            Owner: <b>{data[2]}</b>
                          </p>
                          <p className="card-text">
                            Token ID: <b>{data[0]}</b>
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
            Welcome to the example of interaction with a NFT contract in VARA
            Network
          </h3>
          <VaraNetwork.Interaction
            trigger={({ readState, getAccountInfo }) => (
              <>
                <Btn
                  onClick={() => {
                    //The contract is read and the initial states are assigned
                    let varaAccount = getAccountInfo();
                    setAccount(varaAccount);
                    let info = readState(contract, contractData, "all");
                    info.then((res) => {
                      console.log(res.all);
                      let arr = [];
                      for (
                        let i = 0;
                        i < res.all.tokenMetadataById.length;
                        i++
                      ) {
                        arr.push(
                          res.all.tokenMetadataById[i].concat(
                            res.all.ownerById[i][1]
                          )
                        );
                      }
                      setNftData(arr.sort((a, b) => a[0] - b[0]));
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
    </App>
  </VaraNetwork.Wrapper>
);
