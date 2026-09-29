import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./components/layout/Layout";
import { Answer } from "./pages/Answer";
import { Saved } from "./pages/Saved";
import { History } from "./pages/History";
import { Subjects } from "./pages/Subjects";
import { Settings } from "./pages/Settings";
import { Auth } from "./pages/Auth";
import type { JSX } from "react/jsx-runtime";


function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/app" element={<RequireAuth><Layout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="answer" element={<Answer />} />
          <Route path="saved" element={<Saved />} />
          <Route path="history" element={<History />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
