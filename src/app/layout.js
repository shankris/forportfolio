import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";

const openSans = Open_Sans({
  variable: "--font-open-sans", // CSS variable
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "TanStack Tables - Portfolio Showcase",
  description: "Portfolio Showcase",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${openSans.variable} ${montserrat.variable}`}>
        {/* Site-wide header with skip link */}
        <header role='banner'>
          <a
            href='#main-content'
            className='skipLink'
          >
            Skip to main content
          </a>
          <Header />
        </header>

        {/* Main content area */}
        <main
          id='main-content'
          role='main'
        >
          <Main>{children}</Main>
        </main>

        {/* Site-wide footer */}
        <footer role='contentinfo'>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
