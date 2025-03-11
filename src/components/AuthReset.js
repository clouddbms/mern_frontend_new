import { useEffect } from "react";
import LandingPage from "../pages/LandingPage/Landingpage";

const AuthReset = () => {

  useEffect(() => {
    // Clear user authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return <LandingPage />;
};

export default AuthReset;
