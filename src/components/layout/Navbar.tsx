import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Film, Home, Tv, Menu } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 lg:px-4 lg:py-4.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl lg:text-4xl font-bold text-white sci-fi-text">BONE</h1>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Navigation Links */}
          <div
            className={`lg:flex lg:items-center lg:space-x-8 ${isMenuOpen ? 'block' : 'hidden'} absolute lg:static top-16 left-0 w-full lg:w-auto bg-black/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-white ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`
              }
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-white mt-4 lg:mt-0 ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`
              }
            >
              <Film size={20} />
              <span>Movies</span>
            </NavLink>

            <NavLink
              to="/tv-shows"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-white mt-4 lg:mt-0 ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`
              }
            >
              <Tv size={20} />
              <span>TV Shows</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};