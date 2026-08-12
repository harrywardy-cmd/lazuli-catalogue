import Header from "@/components/layout/Header";
import PageTransition from "@/components/layout/PageTransition";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}