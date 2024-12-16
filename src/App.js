import logo from "./logo.svg";
import "./App.css";
import ApplicationRoutes from "./routes";
import { HomePage } from "./components/pages/home/homePage";
import { RegisterPage } from "./components/pages/register/registerPage";
import { ChatWithMisa } from "./components/pages/chat/chat-with-misaPage";
import { LoginPage } from "./components/pages/login/loginPage";

import {
  Link,
  BrowserRouter as Router,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { useState } from "react";
import AdminChat from "./components/pages/admin/adminPage";

import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { BuyCredit } from "./components/pages/payment/buy-credit";
import { PaymentPlan } from "./components/pages/payment/payment-plan";

function App() {
  function ApplicationRoutes() {
    const routes = useRoutes([
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/home", element: <HomePage /> },
      {
        path: "/chat-with-misa",
        element: <ChatWithMisa authenticated={authenticated} />,
      },
      { path: "/admin", element: <AdminChat /> },
      { path: "/payment-plan", element: <PaymentPlan /> },
      { path: "/buy-credit", element: <BuyCredit /> },
    ]);
    return routes;
  }
  const authentication = localStorage.getItem("authenticated");
  // const authentication_admin = localStorage.getItem('authenticated-admin');

  const [authenticated, setAuthenticated] = useState(authentication);
  // const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault();
    if (authenticated) {
      localStorage.removeItem("authenticated");
      localStorage.removeItem("username");
      enqueueSnackbar({
        variant: 'success',
        message: 'Logout was successful!'
      });
    }
  };

  // const handleLogin = (e) => {
  //   e.prevenDefault()
  //   navigate(`/login`)
  // }

  return (
    <Router>
      <SnackbarProvider>
        <div className="App-header">
          <header className="header">
            <span>KudiTraka</span>
            <div className="links">
              <Link to={`/payment-plan`}>Buy Misa Credits</Link>
              <Link to={`/chat-with-misa`}>Chat with MISA</Link>
              {authenticated ? (
                <button onClick={handleLogout}>
                  <Link to={`/login`}>logout</Link>
                </button>
              ) : (
                <button>
                  <Link to={`/login`}>login</Link>
                </button>
              )}
            </div>
          </header>
          <ApplicationRoutes />
        </div>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
