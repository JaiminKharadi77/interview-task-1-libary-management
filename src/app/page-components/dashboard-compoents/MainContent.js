import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/app/store/slices/counterSlice";
import { addBook, removeBook } from "@/app/store/slices/bookSlice";
import UserType from "./DashboardType/UserType";

export default function MainContent({ user }) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const books = useSelector((state) => state.books.books);

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-96 p-4">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
          <UserType books={books} />
        </div>
      </div>
    </main>
  );
}
