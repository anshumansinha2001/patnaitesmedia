import { Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Enhanced metadata for SEO
export const metadata = {
  title: "Patnaites Media | Bring latest news from Patna, Bihar",
  description:
    "Patnaites Media offers the latest news from Patna and Bihar, covering local updates, city happenings, and national news since 2016. Stay updated with us!",
  keywords:
    "patnaites, patnaites media, patna news, patna city, patnaite, news in bihar, patna bihar",
  author: "Patnaites",
  openGraph: {
    title: "Patnaites Media | ",
    description:
      "A news portal for Patnaites. Get the latest updates and insights.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/favicon.ico`,
        alt: "Patnaites Media Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle",
    title: "Patnaites Media",
    description: "A news portal for Patnaites.",
    image: `${process.env.NEXT_PUBLIC_DOMAIN}/favicon.ico`,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_DOMAIN}`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google Search Console */}
        <meta
          name="google-site-verification"
          content="0evcXlCiZK4lHB0jxde5Yw-xQYz60Bjug8ivGTo-s70"
        />
        {/* Google Analytics Code */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M9QR7ZG9XE"
        ></Script>
        <Script id="google-analytics">
          {` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M9QR7ZG9XE');`}
        </Script>
      </head>
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
