export const initialState = {
  tasks: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      let arr = [...state.tasks, action.data];
      return {
        ...state,
        tasks: arr,
      };
    }

    default:
      break;
  }
};

