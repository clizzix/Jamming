// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
    };

    return (
        <nav className="bg-slate-800 p-4 text-white rounded-md shadow-xl">
            <ul className="flex space-x-4 justify-between">
                <div className="flex space-x-4 items-center">
                    <li>
                        <NavLink to="/dashboard" className="hover-cursor">
                            Dashboard
                        </NavLink>
                    </li>
                </div>
                <li>
                    <button
                        className="bg-green-500 w-full p-2 rounded-md cursor-pointer hover:bg-green-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
