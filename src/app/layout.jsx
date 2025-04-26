import "./globals.css";

export const metadata = {
  icons: {
    icon: "/favicon/hirearrive.svg",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {children}
      </body>
    </html>
  );
}
