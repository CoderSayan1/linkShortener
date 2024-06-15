import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const session = window.localStorage.getItem("id");
  const handleLogout = () => {
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("name");
    navigate('/login')
  };

  return (
    <div className="relative  bg-slate-600">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link to='/' className="font-bold text-2xl text-white">Link Shortner</Link>
        </div>
        <div className="hidden space-x-2 lg:block">
          {!session ? (
            <>
              <Link
                to="/signup"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link to="/dashboard" className="text-white text-xl font-semibold hover:underline hover:text-blue-500">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>

        {isMenuOpen && (<div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2">
                  <Link to='/' className="font-bold text-2xl text-black">Link Shortner</Link>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-2 space-y-2">
                {!session ? (
                  <>
                    <Link
                      to="/signup"
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    >
                      Signup
                    </Link>
                    <Link
                      to="/login"
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <Link to="/dashboard" className="text-black text-xl px-2 font-semibold hover:underline hover:text-blue-700">Dashboard</Link>
                    <Link
                      onClick={handleLogout}
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
}
