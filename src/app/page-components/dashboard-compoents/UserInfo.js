export default function UserInfo({ user }) {
  return (
    <div className="text-sm text-gray-600 flex items-center">
      <span className="font-semibold">{user?.email}</span>
      <span className="mx-2">|</span>
      <span className="capitalize bg-blue-100 px-2 py-1 rounded-full text-blue-800">
        {user?.role}
      </span>
    </div>
  );
} 