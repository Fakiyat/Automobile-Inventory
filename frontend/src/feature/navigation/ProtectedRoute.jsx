import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../shared/constants/constants";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  /* in this we are saying let get the refresh token --const refreshToken = localStorage.getItem(REFRESH_TOKEN);--
  then we will try to send a response to this root --("/api/token/refresh/"-- with the refresh token which will give us the new 
  Access token*/
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      //--res.status === 200-- means it the upper process is successful then we will set the token to --ACCESS_TOKEN, res.data.access--//
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  /* this function will look if the refesh token is expired or not,
   if its expired this function will automatically refreshes the token in the backgroud
    so user will not have to worry. and if we are not able to refresh or generate the token
    it will say like your not Authorized and will return the user to the login page*/
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    //--- now if we have the token we will decode it and get the expiration dat from it---//
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; //1000 means geting the dates in sec not in  milisec//
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading....</div>;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
