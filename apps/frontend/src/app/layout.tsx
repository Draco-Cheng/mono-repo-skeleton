import "./globals.css";
import Menu from "../components/templates/Menu";

// Minimal layout for the frontend app with a top menu
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
