import { useState } from "react";
import UserInfo from "./UserInfo";
import LogoutButton from "./LogoutButton";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function Navbar({ user, onLogout }) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <h1 className="text-xl font-semibold flex items-center">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <UserInfo user={user} />
              <LogoutButton onLogout={handleLogoutClick} />
            </div>
          </div>
        </div>
      </nav>

      {showLogoutDialog && (
        <ConfirmDialog
          onClose={() => setShowLogoutDialog(false)}
          onConfirm={handleConfirmLogout}
          title="Confirm Logout"
          message="Are you sure you want to logout? You will need to login again to access your account."
        />
      )}
    </>
  );
}
