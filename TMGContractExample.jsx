//We declare the URLs of the actions that Tamagotchi will show
const actions = {
  stay: "https://media.tenor.com/CedXUNwq3fcAAAAi/tkthao219-bubududu.gif",
  play: "https://media.tenor.com/BEN-yD6BwAEAAAAi/bubududu-panda.gif",
  sleep: "https://media.tenor.com/33DgSJ5j9wwAAAAi/mitchy-sleep.gif",
  eat: "https://media.tenor.com/szQTmSVe6OoAAAAi/eat-yummy.gif",
};

//We initialize the State to show and hide the modal
State.init({ showModal: false });

//We declare the states of the actions and information of Tamagotchi
const [imgAction, setImgAction] = useState(actions.stay);
const [action, setAction] = useState("stay");
const [account, setAccount] = useState(undefined);
const [tmgData, setTmgData] = useState(undefined);
const [foodStatus, setFoodStatus] = useState(undefined);
const [playStatus, setPlayStatus] = useState(undefined);
const [sleepStatus, setSleepStatus] = useState(undefined);
//We declare the states to control the Tamagotchi contract
const [tmgContract, setTmgContract] = useState("");
const [isTMGContract, setIsTMGContract] = useState(false);
const [isOwner, setIsOwner] = useState(false);

//We define the Tamagotchi contract metadata
const contractData =
  "0002000100000000000101000000010200000000000000000107000000f10824000000050200040818746d675f696f24546d67416374696f6e000118104e616d650000000c416765000100104665656400020010506c617900030014536c6565700004001c546d67496e666f00050000080818746d675f696f20546d675265706c79000118104e616d650400000118537472696e670000000c41676504000c010c7536340001000c4665640002002c456e7465727461696e656400030014536c6570740004001c546d67496e666f0c01146f776e657210011c4163746f7249640001106e616d65000118537472696e67000134646174655f6f665f62697274680c010c753634000500000c00000506001010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001401205b75383b2033325d0000140000032000000018001800000503001c0818746d675f696f2854616d61676f7463686900002801106e616d65000118537472696e67000134646174655f6f665f62697274680c010c7536340001146f776e657210011c4163746f72496400010c6665640c010c7536340001246665645f626c6f636b0c010c75363400012c656e7465727461696e65640c010c753634000144656e7465727461696e65645f626c6f636b0c010c7536340001187265737465640c010c7536340001307265737465645f626c6f636b0c010c75363400013c616c6c6f7765645f6163636f756e7420013c4f7074696f6e3c4163746f7249643e00002004184f7074696f6e04045401100108104e6f6e6500000010536f6d650400100000010000";

//We declare the functions to open and close the modal
const showModal = () => {
  State.update({ showModal: true });
};

const closeModal = () => {
  State.update({ showModal: false });
};

//The function for the assignment of the State is declared
//Depending on the time range <1 hour, <3 hours or more a value is assigned
const processStatus = (date) => {
  const actualDate = Date.now();
  if (actualDate <= date + 1800000) {
    return "😊";
  } else if (actualDate <= date + 7200000) {
    return "😐";
  } else {
    return "😡";
  }
};

//The HTML elements with styles that will be used in the component are declared
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
  bottom: -30px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--h-footer);
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

//The button is declared with the interaction to close the modal and update the information that was stored in the contract
const closeModalButton = (
  <VaraNetwork.Interaction
    trigger={({ readState }) => (
      <>
        <Btn
          style={{ width: "200px" }}
          onClick={() => {
            closeModal();
            setAction("stay");
            const info = readState(tmgContract, contractData, "");
            info.then((res) => {
              setTmgData(res);
              console.log(res);
              setFoodStatus(processStatus(res.fedBlock));
              setSleepStatus(processStatus(res.restedBlock));
              setPlayStatus(processStatus(res.entertainedBlock));
            });
          }}
        >
          Close
        </Btn>
      </>
    )}
  />
);

return (
  <VaraNetwork.Wrapper>
    <App>
      {account ? (
        isTMGContract ? (
          <div className="mb-4">
            <div className="wrapper">
              <h3 className="text-center mb-2 text-light fw-bold">
                Tamagotchi
              </h3>
              <h5 className="text-center mb-4 text-light fw-bold">
                {tmgData.name}
              </h5>
              <div className="mb-2 d-flex flex-row gap-2 align-items-center">
                <p className="text-light m-0">Account:</p>
                <VaraNetwork.Identicon size={30} />
                <p className="text-light m-0 fw-semibold">
                  {account.meta.name}
                </p>
              </div>
              <div className="mb-4 d-flex flex-row gap-2 align-items-center">
                <p className="text-light m-0">Created:</p>
                <p className="text-light m-0 fw-semibold">
                  {parseInt(
                    (Date.now() - tmgData.dateOfBirth) / (1000 * 60 * 60 * 24),
                    10
                  )}{" "}
                  Days ago
                </p>
              </div>
              <div className="d-flex gap-4 text-center bg-light p-3 justify-content-between">
                <div className="px-3">
                  <p className="fs-5 fw-bold mb-0">Food</p>
                  <p className="mb-0 fs-5">{foodStatus}</p>
                </div>
                <div className="px-3">
                  <p className="fs-5 fw-bold mb-0">Play</p>
                  <p className="mb-0 fs-5">{playStatus}</p>
                </div>
                <div className="px-3">
                  <p className="fs-5 fw-bold mb-0">Sleep</p>
                  <p className="mb-0 fs-5">{sleepStatus}</p>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center py-3 bg-light">
                <img src={imgAction} width={200} />
              </div>
              <VaraNetwork.Interaction
                trigger={({ signTransaction }) => (
                  <div className="d-flex gap-4 justify-content-between pt-3">
                    <Btn
                      style={{ width: "110px" }}
                      onClick={() => {
                        //The signTransaction for feed is declared
                        signTransaction(
                          contract,
                          contractData,
                          { Feed: null },
                          899819245,
                          0
                        );
                        //The action of Tamagotchi is performed
                        setImgAction(actions.eat);
                        setAction("eat");
                        setTimeout(() => {
                          setImgAction(actions.stay);
                          //Is sent to show the modal
                          showModal();
                        }, "10000");
                      }}
                    >
                      Eat
                    </Btn>
                    <Btn
                      style={{ width: "110px" }}
                      onClick={() => {
                        //The signTransaction for play is declared
                        signTransaction(
                          contract,
                          contractData,
                          { Play: null },
                          899819245,
                          0
                        );
                        //The action of Tamagotchi is performed
                        setImgAction(actions.play);
                        setAction("play");
                        setTimeout(() => {
                          setImgAction(actions.stay);
                          //Is sent to show the modal
                          showModal();
                        }, "10000");
                      }}
                    >
                      Play
                    </Btn>
                    <Btn
                      style={{ width: "110px" }}
                      onClick={() => {
                        //The signTransaction for sleep is declared
                        signTransaction(
                          contract,
                          contractData,
                          { Sleep: null },
                          899819245,
                          0
                        );
                        //The action of Tamagotchi is performed
                        setImgAction(actions.sleep);
                        setAction("sleep");
                        setTimeout(() => {
                          setImgAction(actions.stay);
                          //Is sent to show the modal
                          showModal();
                        }, "10000");
                      }}
                    >
                      Sleep
                    </Btn>
                  </div>
                )}
              />
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <h3 className="text-center text-white mb-5">
              The contract you wrote is not a Tamagotchi try again
            </h3>
            <Btn onClick={() => setAccount(undefined)}>Go Back</Btn>
          </div>
        )
      ) : (
        <div className="wrapper">
          <h3 className="text-center text-white mb-5">
            Welcome to the example of interaction with a TMG contract in VARA
            Network
          </h3>
          <h5 className="text-center text-white mb-2">
            Write the address of your tamagotchi contract
          </h5>
          <Input className="mb-3">
            <input
              onChange={(e) => setTmgContract(e.target.value)}
              value={tmgContract}
              type="text"
            />
          </Input>
          <VaraNetwork.Interaction
            trigger={({ readState, getAccountInfo }) => (
              <>
                <Btn
                  onClick={() => {
                    //The information of the Tamagotchi contract is loaded
                    const info = readState(tmgContract, contractData, "");
                    let varaAccount = getAccountInfo();
                    setAccount(varaAccount);
                    info.then((res) => {
                      if (res.fed == 10000) {
                        console.log(res);
                        setTmgData(res);
                        setFoodStatus(processStatus(res.fedBlock));
                        setSleepStatus(processStatus(res.restedBlock));
                        setPlayStatus(processStatus(res.entertainedBlock));
                        setIsTMGContract(true);
                        setIsOwner(varaAccount.decodedAddress == res.owner);
                      }
                    });
                  }}
                >
                  Search tamagotchi
                </Btn>
              </>
            )}
          />
        </div>
      )}
      {state.showModal && (
        <Widget
          src="syi216.near/widget/ModalTMG"
          props={{
            //The necessary props are sent to the modal component to be able to show it
            action: action,
            closeModalButton: closeModalButton,
          }}
        />
      )}

      <Footer className="w-100">
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
