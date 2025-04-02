"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Protected Routes Demo",
//   description: "A demo of protected routes in Next.js",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
