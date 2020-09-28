// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./store/reducer/rootReducer";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";

// import firebase from "./config/fbConfig";
// import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
// import { createFirestoreInstance } from "redux-firestore";

// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
// );

// const rffProps = {
//   firebase,
//   config: {},
//   dispatch: store.dispatch,
//   createFirestoreInstance,
// };

// ReactDOM.render(
//   <Provider store={store}>
//     <ReactReduxFirebaseProvider {...rffProps}>
//       <App />
//     </ReactReduxFirebaseProvider>
//   </Provider>,
//   document.getElementById("root")
// );
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducer/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";

//for render on auth ready
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);

const profileSpecificProps = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
};

const rrfProps = {
  firebase,
  config: fbConfig,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div className="center">
        {" "}
        <p>Loading Mario Plan...</p>
      </div>
    );
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
