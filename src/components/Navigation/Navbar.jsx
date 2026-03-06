import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Notebook } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Home size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                主頁
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Calendar size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                日曆
            </NavLink>
            <NavLink to="/memos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Notebook size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                備忘錄
            </NavLink>
        </nav>
    );
};

export default Navbar;
