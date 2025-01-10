//Required variables are imported into the code of an external component
const { Fondo, idl, checkIds, sortFunction, tokens } = VM.require(
  "syi216.testnet/widget/IdlVMTContract"
);

//Object with the actions that the avatar can perform
const actions = {
  idle: "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Idle.gif",
  play: "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Play.gif",
  sleep:
    "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Sleep.gif",
  eat: "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Eat.gif",
};

//States for data management
const [isContract, setIsContract] = useState(true);
const [contract, setContract] = useState("");
const [balances, setBalances] = useState(undefined);
const [gameStart, setGameStart] = useState(false);
const [missingIds, setMissingIds] = useState(undefined);
const [account, setAccount] = useState(undefined);
const [canMint, setCanMint] = useState(false);
const [action, setAction] = useState(actions.idle);

//Function to check missing ID´s and declare the load from the contract
const checkGame = (balances) => {
  let idUser = [];
  balances.map((data) => {
    idUser.push(parseInt(data[0]));
  });
  setGameStart(true);
  setMissingIds(checkIds.filter((id) => !idUser.includes(id)));
};

return (
  <div>
    <div className="w-100">
      {gameStart ? (
        <>
          <h2 className="text-center fw-bold mb-4 mt-5">
            Vara Multiple Token Example
          </h2>
          <div className="d-flex flex-row gap-3 w-100 justify-content-center">
            <div className="bg-dark rounded" style={{ width: "500px" }}>
              <div className="text-light p-5 d-flex flex-column justify-content-center">
                <h3 className="text-center mb-3 fw-bold">Actions</h3>
                <Fondo className="d-flex flex-row align-items-end justify-content-center rounded">
                  <img className="w-75" src={action} />
                </Fondo>
                <div className="d-flex flex-row w-100 mt-4 border border-2 border-light p-2 rounded">
                  {parseInt(balances[2][1]) >= 20 ? (
                    canMint ? (
                      <VaraNetwork.SailsInteraction
                        trigger={({ sendQuery, signTransaction }) => (
                          <div className="d-flex justify-content-between w-100">
                            <button
                              type="button"
                              className="btn btn-success fw-bold"
                              style={{ width: "120px" }}
                              onClick={() => {
                                const data = {
                                  contractId: contract,
                                  idl: idl,
                                  serviceName: "Vmt",
                                };
                                const trBurn = signTransaction({
                                  methodName: "Burn",
                                  args: [account.decodedAddress, 2, 20],
                                  ...data,
                                });
                                trBurn.then((res) => {
                                  const infoBalances = sendQuery({
                                    methodName: "TotalSupply",
                                    ...data,
                                  });
                                  infoBalances.then((res) => {
                                    const sortedBalances =
                                      res.sort(sortFunction);
                                    setBalances(sortedBalances);
                                    checkGame(sortedBalances);
                                  });
                                  const trMint = signTransaction({
                                    methodName: "Mint",
                                    args: [account.decodedAddress, 3, 50],
                                    ...data,
                                  });
                                  trMint.then((res) => {
                                    const infoBalances = sendQuery({
                                      methodName: "TotalSupply",
                                      ...data,
                                    });
                                    infoBalances.then((res) => {
                                      const sortedBalances =
                                        res.sort(sortFunction);
                                      setBalances(sortedBalances);
                                      checkGame(sortedBalances);
                                    });
                                    setAction(actions.eat);
                                    setTimeout(() => {
                                      setAction(actions.idle);
                                    }, "10000");
                                  });
                                });
                              }}
                            >
                              Eat
                            </button>
                            <button
                              type="button"
                              className="btn btn-success fw-bold"
                              style={{ width: "120px" }}
                              onClick={() => {
                                const data = {
                                  contractId: contract,
                                  idl: idl,
                                  serviceName: "Vmt",
                                };
                                const trBurn = signTransaction({
                                  methodName: "Burn",
                                  args: [account.decodedAddress, 2, 20],
                                  ...data,
                                });
                                trBurn.then((res) => {
                                  const infoBalances = sendQuery({
                                    methodName: "TotalSupply",
                                    ...data,
                                  });
                                  infoBalances.then((res) => {
                                    const sortedBalances =
                                      res.sort(sortFunction);
                                    setBalances(sortedBalances);
                                    checkGame(sortedBalances);
                                  });
                                  const trMint = signTransaction({
                                    methodName: "Mint",
                                    args: [account.decodedAddress, 4, 50],
                                    ...data,
                                  });
                                  trMint.then((res) => {
                                    const infoBalances = sendQuery({
                                      methodName: "TotalSupply",
                                      ...data,
                                    });
                                    infoBalances.then((res) => {
                                      const sortedBalances =
                                        res.sort(sortFunction);
                                      setBalances(sortedBalances);
                                      checkGame(sortedBalances);
                                    });
                                    setAction(actions.sleep);
                                    setTimeout(() => {
                                      setAction(actions.idle);
                                    }, "10000");
                                  });
                                });
                              }}
                            >
                              Sleep
                            </button>
                            <button
                              type="button"
                              className="btn btn-success fw-bold"
                              style={{ width: "120px" }}
                              onClick={() => {
                                const data = {
                                  contractId: contract,
                                  idl: idl,
                                  serviceName: "Vmt",
                                };
                                const trBurn = signTransaction({
                                  methodName: "Burn",
                                  args: [account.decodedAddress, 2, 20],
                                  ...data,
                                });
                                trBurn.then((res) => {
                                  const infoBalances = sendQuery({
                                    methodName: "TotalSupply",
                                    ...data,
                                  });
                                  infoBalances.then((res) => {
                                    const sortedBalances =
                                      res.sort(sortFunction);
                                    setBalances(sortedBalances);
                                    checkGame(sortedBalances);
                                  });
                                  const trMint = signTransaction({
                                    methodName: "Mint",
                                    args: [account.decodedAddress, 5, 50],
                                    ...data,
                                  });
                                  trMint.then((res) => {
                                    const infoBalances = sendQuery({
                                      methodName: "TotalSupply",
                                      ...data,
                                    });
                                    infoBalances.then((res) => {
                                      const sortedBalances =
                                        res.sort(sortFunction);
                                      setBalances(sortedBalances);
                                      checkGame(sortedBalances);
                                    });
                                    setAction(actions.play);
                                    setTimeout(() => {
                                      setAction(actions.idle);
                                    }, "10000");
                                  });
                                });
                              }}
                            >
                              Play
                            </button>
                          </div>
                        )}
                      />
                    ) : (
                      <h5 className="text-center fw-bold w-100">
                        You don't have any minting permissions
                      </h5>
                    )
                  ) : (
                    <h5 className="text-center fw-bold w-100">
                      You need more gold to interact
                    </h5>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-dark h-100 rounded" style={{ width: "500px" }}>
              <div className="text-light p-5">
                <h3 className="text-center fw-bold mb-3">Stats List</h3>
                <div className="d-flex flex-column gap-3">
                  {tokens.map((tokenInfo, index) => {
                    const missId = !missingIds.includes(tokenInfo.tokenId);
                    const balance = balances.find(
                      (token) => parseInt(token[0]) == tokenInfo.tokenId
                    );
                    return (
                      <div>
                        <div className="d-flex flex-row align-items-center justify-content-between gap-3 border-bottom border-2 pb-2 border-light">
                          <div className="d-flex flex-row align-items-center gap-3">
                            <div>
                              <img
                                className="border border-2 rounded-circle border-light p-2"
                                src={tokenInfo.img}
                                width={60}
                              />
                            </div>
                            <div className="d-flex flex-column">
                              <p className="fw-bold m-0">{tokenInfo.name}</p>
                              {missId && (
                                <p className="m-0">
                                  {tokenInfo.tokenId != 0 && <b>Balance:</b>}{" "}
                                  {parseInt(balance[1])}
                                </p>
                              )}
                            </div>
                          </div>
                          {!missId
                            ? canMint && (
                                <VaraNetwork.SailsInteraction
                                  trigger={({ signTransaction, sendQuery }) => (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-success fw-bold"
                                        onClick={() => {
                                          const data = {
                                            contractId: contract,
                                            idl: idl,
                                            serviceName: "Vmt",
                                          };
                                          const tr = signTransaction({
                                            methodName: "Mint",
                                            args: [
                                              account.decodedAddress,
                                              tokenInfo.tokenId,
                                              0,
                                            ],
                                            ...data,
                                          });
                                          tr.then((res) => {
                                            const infoBalances = sendQuery({
                                              methodName: "TotalSupply",
                                              ...data,
                                            });
                                            infoBalances.then((res) => {
                                              const sortedBalances =
                                                res.sort(sortFunction);
                                              setBalances(sortedBalances);
                                              checkGame(sortedBalances);
                                            });
                                          });
                                        }}
                                      >
                                        Generate {tokenInfo.name}
                                      </button>
                                    </>
                                  )}
                                />
                              )
                            : tokenInfo.tokenId == 1
                            ? parseInt(balance[1]) >= 100 &&
                              canMint && (
                                <VaraNetwork.SailsInteraction
                                  trigger={({ sendQuery, signTransaction }) => (
                                    <button
                                      type="button"
                                      className="btn btn-success fw-bold"
                                      style={{ width: "120px" }}
                                      onClick={() => {
                                        const data = {
                                          contractId: contract,
                                          idl: idl,
                                          serviceName: "Vmt",
                                        };
                                        const trBurn = signTransaction({
                                          methodName: "Burn",
                                          args: [
                                            account.decodedAddress,
                                            tokenInfo.tokenId,
                                            100,
                                          ],
                                          ...data,
                                        });
                                        trBurn.then((res) => {
                                          const infoBalances = sendQuery({
                                            methodName: "TotalSupply",
                                            ...data,
                                          });
                                          infoBalances.then((res) => {
                                            const sortedBalances =
                                              res.sort(sortFunction);
                                            setBalances(sortedBalances);
                                            checkGame(sortedBalances);
                                          });
                                          const trMint = signTransaction({
                                            methodName: "Mint",
                                            args: [
                                              account.decodedAddress,
                                              0,
                                              1,
                                            ],
                                            ...data,
                                          });
                                          trMint.then((res) => {
                                            const infoBalances = sendQuery({
                                              methodName: "TotalSupply",
                                              ...data,
                                            });
                                            infoBalances.then((res) => {
                                              const sortedBalances =
                                                res.sort(sortFunction);
                                              setBalances(sortedBalances);
                                              checkGame(sortedBalances);
                                            });
                                          });
                                        });
                                      }}
                                    >
                                      Exchange for level
                                    </button>
                                  )}
                                />
                              )
                            : parseInt(balance[1]) > 0 &&
                              tokenInfo.tokenId >= 3 &&
                              canMint && (
                                <VaraNetwork.SailsInteraction
                                  trigger={({ sendQuery, signTransaction }) => (
                                    <button
                                      type="button"
                                      className="btn btn-success fw-bold"
                                      style={{ width: "120px" }}
                                      onClick={() => {
                                        const data = {
                                          contractId: contract,
                                          idl: idl,
                                          serviceName: "Vmt",
                                        };
                                        const trBurn = signTransaction({
                                          methodName: "Burn",
                                          args: [
                                            account.decodedAddress,
                                            tokenInfo.tokenId,
                                            parseInt(balance[1]),
                                          ],
                                          ...data,
                                        });
                                        trBurn.then((res) => {
                                          const infoBalances = sendQuery({
                                            methodName: "TotalSupply",
                                            ...data,
                                          });
                                          infoBalances.then((res) => {
                                            const sortedBalances =
                                              res.sort(sortFunction);
                                            setBalances(sortedBalances);
                                            checkGame(sortedBalances);
                                          });
                                          const trMint = signTransaction({
                                            methodName: "Mint",
                                            args: [
                                              account.decodedAddress,
                                              1,
                                              parseInt(balance[1]),
                                            ],
                                            ...data,
                                          });
                                          trMint.then((res) => {
                                            const infoBalances = sendQuery({
                                              methodName: "TotalSupply",
                                              ...data,
                                            });
                                            infoBalances.then((res) => {
                                              const sortedBalances =
                                                res.sort(sortFunction);
                                              setBalances(sortedBalances);
                                              checkGame(sortedBalances);
                                            });
                                          });
                                        });
                                      }}
                                    >
                                      Exchange for xp
                                    </button>
                                  )}
                                />
                              )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {missingIds.length == 0 && (
                  <div className="d-flex flex-row align-items-center">
                    {canMint && (
                      <VaraNetwork.SailsInteraction
                        trigger={({ signTransaction, sendQuery }) => (
                          <>
                            <button
                              type="button"
                              className="w-100 btn btn-success mt-4 fw-bold"
                              onClick={() => {
                                const data = {
                                  contractId: contract,
                                  idl: idl,
                                  serviceName: "Vmt",
                                };
                                const tr = signTransaction({
                                  methodName: "Mint",
                                  args: [account.decodedAddress, 2, 100],
                                  ...data,
                                });
                                tr.then((res) => {
                                  const infoBalances = sendQuery({
                                    methodName: "TotalSupply",
                                    ...data,
                                  });
                                  infoBalances.then((res) => {
                                    const sortedBalances =
                                      res.sort(sortFunction);
                                    setBalances(sortedBalances);
                                    checkGame(sortedBalances);
                                  });
                                });
                              }}
                            >
                              Mint more Gold
                            </button>
                          </>
                        )}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : !isContract ? (
        <div className="d-flex flex-row justify-content-center">
          <div className="bg-dark text-light w-50 p-5 rounded mt-5">
            <h3 className="text-center text-white mb-5">
              The contract you wrote is not VMT try again
            </h3>
            <button
              type="button"
              className="btn btn-success w-100 fw-bold"
              onClick={() => {
                setIsContract(true);
                setContract("");
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-row justify-content-center">
          <div className="bg-dark text-light w-50 p-5 rounded mt-5">
            <h3 className="text-center mb-5 fw-bold">
              Welcome to the example of interaction with a VMT contract in VARA
              Network
            </h3>
            <h5 className="text-center text-white mb-2">
              Write the address of your VMT contract
            </h5>
            <input
              type="text"
              value={contract}
              onChange={(e) => setContract(e.target.value)}
            />
            <VaraNetwork.SailsInteraction
              trigger={({ sendQuery, getAccountInfo }) => (
                <>
                  <button
                    type="button"
                    className="btn btn-success w-100 mt-2 fw-bold"
                    onClick={() => {
                      let varaAccount = getAccountInfo();
                      setAccount(varaAccount);
                      const data = {
                        contractId: contract,
                        idl: idl,
                        serviceName: "Vmt",
                      };
                      const infoBalances = sendQuery({
                        methodName: "TotalSupply",
                        ...data,
                      });
                      infoBalances
                        .then((res) => {
                          const sortedBalances = res.sort(sortFunction);
                          setBalances(sortedBalances);
                          checkGame(sortedBalances);
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
                    }}
                  >
                    Start widget
                  </button>
                </>
              )}
            />
          </div>
        </div>
      )}
    </div>
  </div>
);
