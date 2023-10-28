import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "The JaneQuizz",
  description: "A quizz game",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-base-200 min-h-screen">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
