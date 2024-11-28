import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
