import { useState } from "react";
import { Link } from "react-router-dom";

import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import Button from "./ui/Button";

import { isAuthenticated, logout } from "../lib/utilities";

const Navbar = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const authenticated = isAuthenticated();
  return (
    <>
        <nav className="w-full flex justify-between items-center p-2 shadow-lg mb-4">
            <div tabIndex={-1}  className="w-1/3">
                <Link tabIndex={-1} className="text-xl tracking-wide font-bold" to="/">
                    <Button variant="fill">S&P500 Prediction</Button>
                </Link>
            </div>
            <div className="w-1/3 flex justify-evenly text-blue-500">
                { authenticated ? <Link tabIndex={-1} to="my-account">My Account</Link> : null }
            </div>
            <div className="w-1/3 flex justify-end">
                {
                    authenticated ? (
                        <>
                            <Button onClick={logout} variant="outline">Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setOpenLoginModal(true)} variant="outline">Login</Button>
                            <Button onClick={() => setOpenRegisterModal(true)} variant="outline">Register</Button>
                        </>
                    )
                }
            </div>
        </nav>
        <RegisterModal visible={openRegisterModal} onClose={() => setOpenRegisterModal(false)} />
        <LoginModal visible={openLoginModal} onClose={() => setOpenLoginModal(false)} />
    </>
  );
};

export default Navbar