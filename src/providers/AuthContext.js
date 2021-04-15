import createDataContext from "./createDataContext";
import { firebase } from "../Firebase";

const authReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, user: action.payload, loggedIn: true };
    case "signout":
      return { ...state, user: action.payload, loggedIn: false };
    case "persistLogin":
      return {
        ...state,
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
        loading: false,
      };
    case "signup":
      return {
        ...state,
        user: action.payload.user,
        registered: true,
      };
    default:
      return state;
  }
};


const signin = (dispatch) => (email, password) => {

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {

      const uid = response.user.uid;

      const usersRef = firebase.firestore().collection("users");


      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            dispatch({
              type: "errorMessage",
              payload: "User does not exist in the database!",
            });
          } else {
            dispatch({ type: "errorMessage", payload: "" });
            dispatch({ type: "signin", payload: firestoreDocument.data() });
          }
        });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};


const signout = (dispatch) => () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "signout", payload: {} });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

const persistLogin = (dispatch) => () => {
  const userRef = firebase.firestore().collection("users");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userRef
        .doc(user.uid)
        .get()
        .then((document) => {
          dispatch({
            type: "persistLogin",
            payload: { user: document.data(), loggedIn: true },
          });
        })
        .catch((error) => {
          dispatch({ type: "errorMessage", payload: error.message });
        });
    } else {
      dispatch({
        type: "persistLogin",
        payload: { user: {}, loggedIn: false },
      });
    }
  });
};

const signup = (dispatch) => (fullname, email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;

      const data = {
        id: uid,
        email,
        fullname,
      };

      const usersRef = firebase.firestore().collection("users");

      usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          dispatch({
            type: "signup",
            payload: { user: data, registered: true },
          });
        })
        .catch((error) => {
          dispatch({ type: "errorMessage", payload: error.message });
        });
    });

};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "errorMessage", payload: "" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    persistLogin,
    signup,
    clearErrorMessage,
  },
  {
    user: {},
    errorMessage: "",
    loggedIn: false,
    loading: true,
    registered: false,
  }
);
