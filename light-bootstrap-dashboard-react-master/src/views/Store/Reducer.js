const initialState = {
  logged: false
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  if (action.type === "UPDATE") {
    console.log("reducer   " + action.val);
    console.log("reducer   " + action.logged);
    if (action.val == "admin") {
      newState.admin = true;
    } else {
      newState.admin = false;
    }
    newState.loggedRfid = action.val;
    newState.logged = action.val.logged;
  }

  return newState;
};

export default reducer;
