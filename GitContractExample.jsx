//We import fixed information such as elements and metadata
const {
  contractData,
  App,
  Input,
  Btn,
  Footer,
  collapseContent,
  collapseHeader,
} = VM.require("syi216.near/widget/GitStyledComponents");

//We declare the states of the actions and information of the git repository
const [account, setAccount] = useState(undefined);
const [gitData, setGitData] = useState(undefined);
const [activeAction, setActiveAction] = useState("start");
const [gitContract, setGitContract] = useState("");
const [isGitContract, setIsGitContract] = useState(false);
const [isCollab, setIsCollab] = useState(false);
const [inputData, setInputData] = useState("");
const [branches, setBranches] = useState([]);
const [collaborators, setCollaborators] = useState([]);
const [branchSelect, setBranchSelect] = useState(undefined);
const [collabSelect, setCollabSelect] = useState(undefined);
const [owner, setOwner] = useState("");
const [isExpanded, setIsExpanded] = useState("");

const toggleIsExpanded = (id) => {
  setIsExpanded(isExpanded == id ? "" : id);
};

const ownerCheck = (data, account) => {
  setIsCollab(data.includes(account));
};

//Interface menu code section
const gitActionsMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Actions</h4>
    <div className="mb-4 d-flex flex-column gap-4 align-items-center">
      <Btn
        style={{ width: "348px" }}
        onClick={() => setActiveAction("pushData")}
      >
        Push Data
      </Btn>
      <Btn
        style={{ width: "348px" }}
        onClick={() => setActiveAction("viewBranches")}
      >
        View Branches
      </Btn>
      <div className="d-flex flex-row gap-2">
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("createBranch")}
        >
          Create Branch
        </Btn>
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("deleteBranch")}
        >
          Delete Branch
        </Btn>
      </div>
      <div className="d-flex flex-row gap-2">
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("addCollaborator")}
        >
          Add Collaborator
        </Btn>
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("deleteCollaborator")}
        >
          Delete Collaborator
        </Btn>
      </div>
      <div className="d-flex flex-row gap-2">
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("renameRepo")}
        >
          Rename Repo
        </Btn>
        <Btn
          style={{ width: "170px" }}
          onClick={() => setActiveAction("renameBranch")}
        >
          Rename Branch
        </Btn>
      </div>
      <Btn
        style={{ width: "348px" }}
        onClick={() => {
          setAccount(undefined);
          setGitData(undefined);
          setActiveAction("start");
          setGitContract("");
          setIsGitContract(false);
          setIsCollab(false);
          setInputData("");
          setBranches([]);
          setCollaborators([]);
          setBranchSelect(undefined);
          setCollabSelect(undefined);
          setOwner("");
          setIsExpanded("");
        }}
      >
        Go Back
      </Btn>
    </div>
  </>
);

//Code section of the create branch menu
const createBranchMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Create Branch</h4>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Branch name</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for create branch is declared
            signTransaction(
              gitContract,
              contractData,
              { CreateBranch: inputData },
              118156152120,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
            }, "4000");
          }}
        >
          Save Branch
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the add collaborator menu
const addCollaboratorMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Add Collaborator
    </h4>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Collaborator wallet</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for add collaborator is declared
            signTransaction(
              gitContract,
              contractData,
              { AddCollaborator: inputData },
              118156152120,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
            }, "4000");
          }}
        >
          Add Collaborator
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the rename repository menu
const renameRepoMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Rename Repository
    </h4>
    <p className="text-light m-0 text-center mb-2">
      It will take some time for the information update to be reflected.
    </p>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Repository name</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for rename repo is declared
            signTransaction(
              gitContract,
              contractData,
              { Rename: inputData },
              118156152120,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
            }, "4000");
          }}
        >
          Save Name
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Menu code section delete branch
const deleteBranchMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Delete Branch</h4>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Select Branch</h5>
      <select onChange={(e) => setBranchSelectelect(e.target.value)}>
        <option value={null} selected disabled>
          Select a branch
        </option>
        {branches.map((data) => {
          return <option value={data.id}>{data.name}</option>;
        })}
      </select>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for delete branch is declared
            signTransaction(
              gitContract,
              contractData,
              { DeleteBranch: { branch_id: branchSelect } },
              117525470340,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setBranchSelect(undefined);
            }, "4000");
          }}
        >
          Delete Branch
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the menu delete collaborator
const deleteCollaboratorMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Delete Collaborator
    </h4>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Select Collaborator</h5>
      <select onChange={(e) => setCollabSelect(e.target.value)}>
        <option value={null} selected disabled>
          Select a collaborator
        </option>
        {collaborators.map((data) => {
          return (
            <option value={data}>
              {data.substr(0, 12) + "..." + data.substr(-12, 12)}
            </option>
          );
        })}
      </select>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for delete collaborator is declared
            signTransaction(
              gitContract,
              contractData,
              { DeleteCollaborator: collabSelect },
              117525470340,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setCollabSelect(undefined);
            }, "4000");
          }}
        >
          Delete Collaborator
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the menu rename branch
const renameBranchMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Rename Branch</h4>
    <div className="mb-2 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Select a Branch</h5>
      <select onChange={(e) => setBranchSelectelect(e.target.value)}>
        <option value={null} selected disabled>
          Select a branch
        </option>
        {branches.map((data) => {
          return <option value={data.id}>{data.name}</option>;
        })}
      </select>
    </div>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Branch name</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for rename branch is declared
            signTransaction(
              gitContract,
              contractData,
              { RenameBranch: { id: branchSelect, name: inputData } },
              117525470340,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
              setBranchSelect(undefined);
            }, "4000");
          }}
        >
          Rename Branch
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Push data menu code section
const pushDataMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">Push Data</h4>
    <div className="mb-2 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Select a Branch</h5>
      <select onChange={(e) => setBranchSelect(e.target.value)}>
        <option value={null} selected disabled>
          Select a branch
        </option>
        {branches.map((data) => {
          return <option value={data.id}>{data.name}</option>;
        })}
      </select>
    </div>
    <div className="mb-4 d-flex flex-column">
      <h5 className="text-light m-0 mb-3">Write the hash of your code</h5>
      <Input>
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </Input>
    </div>
    <VaraNetwork.Interaction
      trigger={({ signTransaction }) => (
        <Btn
          className="mb-2"
          onClick={() => {
            //The signTransaction for push data is declared
            signTransaction(
              gitContract,
              contractData,
              { Push: { branch_id: branchSelect, hash: inputData } },
              117525470340,
              0
            );
            setTimeout(() => {
              setActiveAction("transaction");
              setInputData("");
              setBranchSelect(undefined);
            }, "4000");
          }}
        >
          Save Data
        </Btn>
      )}
    />
    <Btn onClick={() => setActiveAction("start")}>Cancel</Btn>
  </>
);

//Code section of the branches menu
const branchesMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Available Branches
    </h4>
    <div
      className="d-flex flex-column gap-2"
      style={{ width: "384px", height: "321px", "overflow-y": "scroll" }}
    >
      {branches.map((data) => {
        return (
          <div>
            <collapseHeader
              className="d-flex flex-row text-light justify-content-between p-2"
              onClick={() => toggleIsExpanded(data.id)}
            >
              <h4 className="m-0">{data.name}</h4>
              <h4 className="m-0 fw-bold">↓</h4>
            </collapseHeader>
            <collapseContent
              style={{ height: isExpanded == data.id ? "auto" : "0px" }}
            >
              <div className="p-2">
                {data.commits.length == 0 ? (
                  <h5 className="fw-bold text-center py-2">
                    No commits have been made on this branch
                  </h5>
                ) : (
                  data.commits.reverse().map((commit) => {
                    const date = new Date(commit.createdAt);
                    return (
                      <>
                        <div className="d-flex flex-row gap-2">
                          <p className="fw-bold">Id:</p>
                          <p className="">{commit.id}</p>
                        </div>
                        <div className="d-flex flex-row gap-2">
                          <p className="fw-bold">Owner:</p>
                          <p className="">
                            {commit.owner.substr(0, 12) +
                              "..." +
                              commit.owner.substr(-12, 12)}
                          </p>
                        </div>
                        <div className="d-flex flex-row gap-2">
                          <p className="fw-bold">Date:</p>
                          <p className="">{date.toDateString()}</p>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <p className="fw-bold m-0">Content:</p>
                          <p className="m-0">{commit.hash}</p>
                        </div>
                        <hr />
                      </>
                    );
                  })
                )}
              </div>
            </collapseContent>
          </div>
        );
      })}
    </div>
    <Btn className="mt-2" onClick={() => setActiveAction("start")}>
      Back
    </Btn>
  </>
);

//Menu code section processing transaction
const transactionMenu = (
  <>
    <h4 className="text-light m-0 text-center fw-bold mb-2">
      Processing transaction
    </h4>
    <p className="text-light m-0 text-center mb-2">
      Your transaction is being processed, press the button below once the
      transaction has been confirmed to reload the information
    </p>
    <VaraNetwork.Interaction
      trigger={({ readState }) => (
        <>
          <Btn
            onClick={() => {
              const info = readState(gitContract, contractData, "");
              //The information is reloaded after each transaction
              info.then((res) => {
                const collab = [res.owner];
                const extraCollab = Object.values(res.collaborator);
                ownerCheck(collab.concat(extraCollab), account.decodedAddress);
                setGitData({ owner: res.owner, name: res.name });
                setBranches(Object.values(res.branches));
                setCollaborators(extraCollab);
                setActiveAction("start");
              });
            }}
          >
            Go Back
          </Btn>
        </>
      )}
    />
  </>
);

return (
  <VaraNetwork.Wrapper>
    <App>
      {account ? (
        isGitContract ? (
          <div className="mb-4">
            <div className="wrapper">
              <h3 className="text-center mb-2 text-light fw-bold">
                {gitData.name}
              </h3>
              <div className="mb-4 d-flex flex-row gap-2 align-items-center">
                <p className="text-light m-0">Owner:</p>
                <p className="text-light m-0 fw-semibold">{owner}</p>
              </div>
              <div className="mb-2 d-flex flex-row gap-2 align-items-center">
                <p className="text-light m-0">Account:</p>
                <VaraNetwork.Identicon size={30} />
                <p className="text-light m-0 fw-semibold">
                  {account.meta.name}
                </p>
              </div>
              <div className="mb-4 d-flex flex-row gap-2 align-items-center">
                <p className="text-light m-0">Collaborator:</p>
                <p className="text-light m-0 fw-semibold">
                  {isCollab ? "✅" : "❌"}
                </p>
              </div>

              {activeAction == "start" && gitActionsMenu}
              {activeAction == "createBranch" && createBranchMenu}
              {activeAction == "addCollaborator" && addCollaboratorMenu}
              {activeAction == "renameRepo" && renameRepoMenu}
              {activeAction == "deleteBranch" && deleteBranchMenu}
              {activeAction == "deleteCollaborator" && deleteCollaboratorMenu}
              {activeAction == "renameBranch" && renameBranchMenu}
              {activeAction == "pushData" && pushDataMenu}
              {activeAction == "viewBranches" && branchesMenu}
              {activeAction == "transaction" && transactionMenu}
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <h3 className="text-center text-white mb-5">
              The contract you wrote is not a Repository try again
            </h3>
            <Btn onClick={() => setAccount(undefined)}>Go Back</Btn>
          </div>
        )
      ) : (
        <div className="wrapper">
          <h3 className="text-center text-white mb-5">
            Welcome to the example of interaction with a Git Repository contract
            in VARA Network
          </h3>
          <h5 className="text-center text-white mb-2">
            Write the address of your Repository contract
          </h5>
          <Input className="mb-3">
            <input
              onChange={(e) => setGitContract(e.target.value)}
              value={gitContract}
              type="text"
            />
          </Input>
          <VaraNetwork.Interaction
            trigger={({ readState, getAccountInfo }) => (
              <>
                <Btn
                  onClick={() => {
                    const info = readState(gitContract, contractData, "");
                    let varaAccount = getAccountInfo();
                    setAccount(varaAccount);
                    info.then((res) => {
                      setIsGitContract(
                        res.hasOwnProperty("branches") &&
                          res.hasOwnProperty("userProgramId")
                      );
                      const collab = [res.owner];
                      const extraCollab = Object.values(res.collaborator);
                      ownerCheck(
                        collab.concat(extraCollab),
                        varaAccount.decodedAddress
                      );
                      setGitData({ owner: res.owner, name: res.name });
                      setBranches(Object.values(res.branches));
                      setCollaborators(extraCollab);
                      setOwner(
                        res.owner.substr(0, 12) +
                          "..." +
                          res.owner.substr(-12, 12)
                      );
                    });
                  }}
                >
                  Search Repository
                </Btn>
              </>
            )}
          />
        </div>
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
