import Loader from "components/Loader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "firebaseApp";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./components/Router";

function App() {
  const auth = getAuth(app);
  // auth를 체크하기전에 (initalize 전)에는 loader을 띄어주는 용도
  const [init, setInit] = useState(false);
  // auth의 currentuser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </>
  );
}

export default App;
