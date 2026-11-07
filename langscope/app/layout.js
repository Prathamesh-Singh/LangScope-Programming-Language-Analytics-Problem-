import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "LangScope",
  description: "Programming language analytics platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main className="container">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
