import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/Interviewprep/InterviewPrep";
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interviewprep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
