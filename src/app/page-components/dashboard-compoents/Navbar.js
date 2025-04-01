import UserInfo from './UserInfo';
import LogoutButton from './LogoutButton';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <h1 className="text-xl font-semibold flex items-center">Dashboard</h1>
          <div className="flex items-center gap-4">
            <UserInfo user={user} />
            <LogoutButton onLogout={onLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
} 