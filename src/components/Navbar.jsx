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
        <nav className="bg-slate-800 p-4 text-white">
            <ul className="flex space-x-4 justify-between">
                <div className="flex space-x-4">
                    <li>
                        <NavLink to="/dashboard" className="hover-cursor">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Playlist">Playlist</NavLink>
                    </li>
                    <li>
                        <NavLink to="Track">Track</NavLink>
                    </li>
                    <li>
                        <NavLink to="Tracklist">Tracklist</NavLink>
                    </li>
                </div>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
