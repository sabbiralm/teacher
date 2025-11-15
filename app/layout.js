import { SessionProvider } from './SessionProvider';
import './globals.css';

export const metadata = {
  title: 'Your App',
  description: 'Next.js App with Authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}