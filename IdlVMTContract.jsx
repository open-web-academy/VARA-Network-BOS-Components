//VMT Extended Contract IDL
const idl = `
type TokenMetadata = struct {
  title: opt str,
  description: opt str,
  media: opt str,
  reference: opt str,
};

constructor {
  New : (name: str, symbol: str, decimals: u8);
};

service Vmt {
  Burn : (from: actor_id, id: u256, amount: u256) -> null;
  BurnBatch : (from: actor_id, ids: vec u256, amounts: vec u256) -> null;
  GrantAdminRole : (to: actor_id) -> null;
  GrantBurnerRole : (to: actor_id) -> null;
  GrantMinterRole : (to: actor_id) -> null;
  Mint : (to: actor_id, id: u256, amount: u256, token_metadata: opt TokenMetadata) -> null;
  MintBatch : (to: actor_id, ids: vec u256, amounts: vec u256, token_metadata: vec opt TokenMetadata) -> null;
  RevokeAdminRole : (from: actor_id) -> null;
  RevokeBurnerRole : (from: actor_id) -> null;
  RevokeMinterRole : (from: actor_id) -> null;
  Approve : (to: actor_id) -> bool;
  BatchTransferFrom : (from: actor_id, to: actor_id, ids: vec u256, amounts: vec u256) -> null;
  TransferFrom : (from: actor_id, to: actor_id, id: u256, amount: u256) -> null;
  query Admins : () -> vec actor_id;
  query Burners : () -> vec actor_id;
  query Minters : () -> vec actor_id;
  query BalanceOf : (account: actor_id, id: u256) -> u256;
  query BalanceOfBatch : (accounts: vec actor_id, ids: vec u256) -> vec u256;
  query Decimals : () -> u8;
  query IsApproved : (account: actor_id, operator: actor_id) -> bool;
  query Name : () -> str;
  query Symbol : () -> str;
  query TotalSupply : () -> vec struct { u256, u256 };

  events {
    Minted: struct { to: actor_id, ids: vec u256, amounts: vec u256 };
    Burned: struct { from: actor_id, ids: vec u256, amounts: vec u256 };
    Approval: struct { from: actor_id, to: actor_id };
    Transfer: struct { from: actor_id, to: actor_id, ids: vec u256, amounts: vec u256 };
  }
};
`;

//Array with the information of the tokens availables
const tokens = [
  {
    tokenId: 0,
    name: "Level",
    img: "https://cdn-icons-png.flaticon.com/512/276/276020.png",
  },
  {
    tokenId: 1,
    name: "Experience",
    img: "https://cdn-icons-png.flaticon.com/512/6779/6779087.png",
  },
  {
    tokenId: 2,
    name: "Gold",
    img: "https://cdn-icons-png.flaticon.com/512/1087/1087086.png",
  },
  {
    tokenId: 3,
    name: "Food counter",
    img: "https://cdn-icons-png.flaticon.com/512/3703/3703377.png",
  },
  {
    tokenId: 4,
    name: "Sleep counter",
    img: "https://cdn-icons-png.flaticon.com/512/1426/1426375.png",
  },
  {
    tokenId: 5,
    name: " Play counter",
    img: "https://cdn-icons-png.flaticon.com/512/5542/5542040.png",
  },
];

//array with the ID´s to check
const checkIds = [0, 1, 2, 3, 4, 5];

//Function to sort the balances
const sortFunction = (a, b) => {
  if (parseInt(a[0]) === parseInt(b[0])) {
    return 0;
  } else {
    return parseInt(a[0]) < parseInt(b[0]) ? -1 : 1;
  }
};

//Div tag with custom css
const Fondo = styled.div`
        font-weight: 400;
        font-size: 1em;
        line-height: 1.6em;
        box-shadow: none;
        background-image: url('https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/backgorund-play.png');
        background-repeat: no-repeat;
        background-size: cover;        
        color: #198754;
        min-height: 500px;
        max-height: auto;
        border: solid 5px;
        `;

//Object with the actions that the avatar can perform
const actions = {
  idle: "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Idle.gif",
  play: "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Play.gif",
  sleep:
    "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Sleep.gif",
  eat: "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Eat.gif",
};

return { Fondo, idl, checkIds, sortFunction, tokens };
