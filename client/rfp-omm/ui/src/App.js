import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/components/ui/LoginPage";
import StudyApp from "@/components/ui/StudyApp";
const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    return isAuthenticated ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/", replace: true });
};
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/app", element: _jsx(PrivateRoute, { children: _jsx(StudyApp, {}) }) })] }) }));
};
export default App;
