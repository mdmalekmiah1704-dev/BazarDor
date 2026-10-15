import "./globals.css";
import Providers from "./components/Providers";

export const metadata = {
  title: "বাজার দর",
  description: "প্রতিদিনের বাজারদর",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-scroll-behavior="smooth">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}