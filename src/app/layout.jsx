import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  icons: {
    icon: "/favicon/hirearrive.svg",
  }
}

export default function RootLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          {children}
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
