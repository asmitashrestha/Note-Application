// App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./components/ChangePassword";
import Notes from "./components/Notes";
import AddNotes from "./components/AddNotes";
import Settings from "./pages/Settings";
import EditNote from "./pages/EditNote";
import { useAuthStore } from "../store/store";

const App = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {isLoggedIn && (
          <>
            <Route path={"/notes"} element={<Notes />} />
            <Route path={"/add-notes"} element={<AddNotes />} />
          </>
        )}

        <Route path={"/settings"} element={<Settings />} />
        {/* Remove onClose and onUpdate props */}
        <Route path="/edit-note" element={<EditNote noteId={undefined} />} />
      </Routes>
    </div>
  );
};

export default App;
