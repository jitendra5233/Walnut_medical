const iSate = {
  isLogin: false,
  user: {
    token: "",
    f_name: "",
    l_name: "",
  },
};

export const Reducer = (state = iSate, action) => {
  switch (action.type) {
    case "HANDLE_LOGIN": {
      console.log(action);
      return {
        ...state,
        isLogin: true,
        user: {
          ...state.user,
          token: action.payload.id,
          f_name: action.payload.f_name,
          l_name: action.payload.l_name,
        },
      };
    }
    case "HANDLE_LOGOUT": {
      return {
        ...state,
        isLogin: false,
        user: {
          ...state.user,
          token: "",
          f_name: "",
          l_name: "",
        },
      };
    }
    case "UPDATE_TOKEN": {
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload.id,
        },
      };
    }
    default:
      return state;
  }
};
