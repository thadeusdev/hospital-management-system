import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import {
  FaTh,
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaUserMd,
  FaWheelchair,
  FaDisease,
  FaMicroscope,
  FaTablets,
  FaPrescriptionBottleAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Login from "../../pages/Registration/Login/Login";
import Signup from "../../pages/Registration/Signup/Signup";

const Sidebar = ({ children, mobileOpen, onCloseMobile }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) r.json().then(setUser);
    });
  }, []);

  const handleLogout = () =>
    fetch("/logout", { method: "DELETE" }).then(() => setUser(null));

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login onLogin={setUser} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onLogin={setUser} />} />
      </Routes>
    );
  }

  const menuItem = [
    { path: "/", name: "Dashboard", icon: <FaTh /> },
    { path: "/appointment", name: "Appointments", icon: <FaCalendarAlt /> },
    { path: "/doctors", name: "Doctors", icon: <FaUserMd /> },
    { path: "/patients", name: "Patients", icon: <FaWheelchair /> },
    { path: "/diseases", name: "Diseases", icon: <FaDisease /> },
    { path: "/diagnoses", name: "Diagnoses", icon: <FaMicroscope /> },
    { path: "/medicines", name: "Medicines", icon: <FaTablets /> },
    {
      path: "/prescriptions",
      name: "Prescriptions",
      icon: <FaPrescriptionBottleAlt />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden
        />
      )}

      {/* sidebar */}
      <aside
        className={[
          "fixed z-50 inset-y-0 left-0 bg-white border-r border-gray-100 flex flex-col transition-transform duration-200",
          isOpen ? "lg:w-60" : "lg:w-16",
          "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto",
        ].join(" ")}
      >
        <div className="flex items-center justify-between h-14 px-3 border-b border-gray-100 gap-2">
          <span
            className={`font-semibold text-gray-800 truncate ${isOpen ? "lg:inline" : "lg:hidden"} inline`}
          >
            {user.username}
          </span>
          <button
            aria-label={isOpen ? "Collapse" : "Expand"}
            onClick={() => setIsOpen((o) => !o)}
            className="hidden lg:inline-flex p-2 rounded-md hover:bg-gray-100 shrink-0"
          >
            <FaBars size={16} />
          </button>
          <button
            aria-label="Close menu"
            onClick={onCloseMobile}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 shrink-0"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {menuItem.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 mx-2 px-2.5 py-2 rounded-md text-sm transition",
                  isActive
                    ? "bg-brand-50 text-brand-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100",
                ].join(" ")
              }
            >
              <span className="shrink-0">{item.icon}</span>
              <span
                className={`truncate ${isOpen ? "lg:inline" : "lg:hidden"} inline`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mx-2 mb-2 px-2.5 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaSignOutAlt className="shrink-0" />
          <span
            className={`truncate ${isOpen ? "lg:inline" : "lg:hidden"} inline`}
          >
            Logout
          </span>
        </button>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
};

export default Sidebar;
