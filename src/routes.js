import { HomePage } from "./components/pages/home/homePage";
import { ChatWithMisa } from "./components/pages/chat/chat-with-misaPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginPage } from "./components/pages/login/loginPage";
import { RegisterPage } from "./components/pages/register/registerPage";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import AdminChat from "./components/pages/admin/adminPage";


function ApplicationRoutes() {
    const routes = useRoutes([
        { path: "/", element: <LoginPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/home", element: <HomePage /> },
        { path: "/chat-with-misa", element: <ChatWithMisa /> },
        { path: "/admin", element: <AdminChat /> },
    ]);
    return routes;
}

export default ApplicationRoutes;
