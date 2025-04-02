import { useSelector, useDispatch } from "react-redux";

import UserType from "./DashboardType/UserType";
import AdminType from "./DashboardType/AdminType";
import LibrarianType from "./DashboardType/Librarian";

const DashboardComponents = {
  admin: AdminType,
  librarian: LibrarianType,
  user: UserType,
};

export default function MainContent({ user }) {
  const books = useSelector((state) => state.books.books);

  const CurrentDashboard = DashboardComponents[user?.role] || UserType;

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-96 p-4">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
          <CurrentDashboard books={books} />
        </div>
      </div>
    </main>
  );
}
