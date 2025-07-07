import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../RTK/userSlice';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('Authentication'));
    if (storedUser?.loggedIn) {
      dispatch(login(storedUser));
    }
  }, []);

  const navItems = [
    { name: 'Home', link: '/', key: 1 },
    { name: 'Track My Data', link: '/TrackMyData', key: 2 },
    { name: 'Past Data', link: '/PastData', key: 3 },
    { name: 'Explore Features', link: '/OurTools', key: 4 },
    {
      name: user.loggedIn ? 'My Profile' : 'Login',
      link: user.loggedIn ? '/Profile' : '/Login',
      key: 5,
    },
    ...(!user.loggedIn ? [{ name: 'Sign Up', link: '/signup', key: 6 }] : []),
  ];

  return (
    <header className="bg-[#8a1b1b] text-white">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4 md:py-5">
        {/* Logo */}
        <h1 className="text-2xl font-bold">🔥 FitTracker</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-x-6 text-lg font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.link}
              className={({ isActive }) =>
                `hover:underline hover:text-yellow-200 ${
                  isActive ? 'text-yellow-300 font-bold' : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <HiX className="w-7 h-7" />
          ) : (
            <HiMenuAlt3 className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-y-2 text-lg font-semibold">
            {navItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded hover:bg-[#0000005a] ${
                      isActive ? 'text-yellow-300 font-bold' : ''
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Nav;
