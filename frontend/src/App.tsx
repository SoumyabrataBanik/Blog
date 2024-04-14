import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactElement } from "react";

import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import FooterCom from "./components/Footer";

export default function App(): ReactElement {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/about"
                    element={<About />}
                />
                <Route
                    path="/projects"
                    element={<Projects />}
                />
                <Route
                    path="/sign-in"
                    element={<SignIn />}
                />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
            </Routes>
            <FooterCom />
        </BrowserRouter>
    );
}
