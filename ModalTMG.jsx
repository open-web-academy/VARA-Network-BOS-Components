//We get the props and assign them to different variables to use them
let ACTION = props.action;
let closeModalBtn = props.closeModalButton;

//The actions that will be shown in the modal are declared
const actions = {
  eat: "Congratulations, you have fed the tamagotchi",
  play: "Congratulations, you have played with the tamagotchi",
  sleep: "Congratulations, you have put the tamagotchi to sleep",
};

let actionSelected;

//Depending on the action the text to be shown in the modal is assigned
switch (ACTION) {
  case "eat":
    actionSelected = actions.eat;
    break;
  case "play":
    actionSelected = actions.play;
    break;
  case "sleep":
    actionSelected = actions.sleep;
    break;
}

return (
  <div
    style={{
      width: "350px",
      padding: "22px",
      background: "rgb(25, 25, 25)",
      color: "white",
      margin: "auto",
      position: "absolute",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      maxHeight: "calc(100% - 64px)",
      maxWidth: "600px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      right: "0",
      left: "0",
      top: "350px",
      zIndex: "100",
    }}
  >
    <div>
      <h3 className="text-center mb-3">{actionSelected}</h3>
      <div className="d-flex justify-content-center">{closeModalBtn}</div>
    </div>
  </div>
);
