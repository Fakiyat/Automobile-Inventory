// import Register from "./Pages/Register.jsx";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./feature/auth/Login";
import InventoryPage from "./feature/inventory/InventoryPage";
import NotFound from "./shared/components/NotFound";
import ProfilePage from "./feature/Profile/ProfilePage";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}
// function RegisterAndLogout() {
//   localStorage.clear();
//   return <Register />;
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Login />
          } /* and for this route itsnot protected so we can render this without login  */
        />

        <Route
          path="/"
          element={<InventoryPage />} //Protected route we cannt go to this /home without login
        />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/register" element={<RegisterAndLogout />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
