import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { FaBars } from "react-icons/fa";

const Topbar = ({ onOpenMobile }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) r.json().then(setLoggedInUser);
    });
    fetch("/alerts")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        setNotificationCount(
          (data.low_stock?.length || 0) +
            (data.expiring_soon?.length || 0) +
            (data.expired?.length || 0),
        );
      });
  }, []);

  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-gray-100 flex items-center px-3 sm:px-4 lg:px-6 gap-3">
      {/* Hamburger — mobile only */}
      <button
        aria-label="Open menu"
        onClick={onOpenMobile}
        className="lg:hidden p-2 -ml-1 rounded-md hover:bg-gray-100 shrink-0"
      >
        <FaBars size={18} />
      </button>

      {/* Logo / title */}
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <span className="font-semibold text-gray-800">HealthCare</span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" aria-hidden />

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/alerts"
          className="relative p-2 rounded-md hover:bg-gray-100"
          aria-label="Notifications"
        >
          <NotificationsNoneIcon fontSize="small" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Link>

        {loggedInUser ? (
          <Link to={`/users/${loggedInUser.id}`} aria-label="Profile">
            <img
              src={loggedInUser.image || "/default-avatar.png"}
              alt=""
              className="w-8 h-8 rounded-full object-cover bg-gray-200"
            />
          </Link>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200" aria-hidden />
        )}
      </div>
    </header>
  );
};

export default Topbar;
