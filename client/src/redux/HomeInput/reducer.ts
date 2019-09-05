type State = {
  search: string;
};

const initialState: State = {
  search: ""
};

const homeInputReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "HOMEINPUT_CHANGE":
      return {
        search: action.payload
      };
    default:
      return state;
  }
};

export default homeInputReducer;
