import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/ui/LoginPage";
import StudyApp from "./components/ui/StudyApp";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <StudyApp />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
