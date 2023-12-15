import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: localStorage.getItem("user_id"),
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
};

const reducer = (state, action) => {
  console.log(state)
  switch (action.type) {
    case "LOGIN":
      //TODO
      return {
        ...state,
        isAuthenticated:true,
        token:localStorage.getItem('token'),
        user:localStorage.getItem("user_id"),
        role:localStorage.getItem('role')
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...initialState
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    // window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(async() => {
    //TODO'
    let res = await sdk.check(localStorage.getItem("role"));
    if(res){
      
      tokenExpireError(dispatch,"TOKEN_EXPIRED");
    }else{
      dispatch({
        type: "LOGIN",
      });
    }

    console.log(res.error);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
