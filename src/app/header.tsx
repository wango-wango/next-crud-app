"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isopen, setIsopen] = useState(false);
  const toggleMenu = () => {
    setIsopen(!isopen);
  };
  return (
    <header className="bg-slate-800">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div className="-m-1.5 p-1.5"></div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-50"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/features">
            <div className="text-sm font-semibold leading-6 text-slate-50 hover:text-slate-400">
              Features
            </div>
          </Link>
          <Link href="/marketplace">
            <div className="text-sm font-semibold leading-6 text-slate-50 hover:text-slate-400">
              Marketplace
            </div>
          </Link>
          <Link href="/company">
            <div className="text-sm font-semibold leading-6 text-slate-50 hover:text-slate-400">
              Company
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
          <Link href="/signup">
            <div className="text-sm bg-slate-600 rounded font-semibold leading-6 px-2 py-1 text-slate-50 hover:text-slate-400">
              Sign up
            </div>
          </Link>
          <Link href="/signin">
            <div className="text-sm font-semibold leading-6 text-slate-50 hover:text-slate-400">
              Log in <span aria-hidden="true">&rarr;</span>
            </div>
          </Link>
        </div>
      </nav>
      <div
        className={`lg:hidden ${isopen ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link href="#">
                  <div className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-50 hover:text-slate-400">
                    Features
                  </div>
                </Link>
                <Link href="#">
                  <div className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-50 hover:text-slate-400">
                    Marketplace
                  </div>
                </Link>
                <Link href="#">
                  <div className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-50 hover:text-slate-400">
                    Company
                  </div>
                </Link>
              </div>
              <div className="py-6">
                <Link href="/signin">
                  <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-50 hover:text-slate-400">
                    Log in
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
