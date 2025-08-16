import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://brightenschool.uz"),
    title: "Brighten School",
    description:
        "Brighten School - create your future with us!",
    authors: [{ name: "Ilkham Sabirov", url: "https://brightenschool.uz" }],
    icons: { icon: "/logo.svg" },
    openGraph: {
        title: "Brighten School",
        description:
            "Brighten School - create your future with us!",
        type: "website",
        url: "https://brightenschool.uz",
        images: "/og-image.webp",
        countryName: "Uzbekistan",
        siteName: "Brighten School",
    },
    keywords:
        "Brighten school, brightenschool.uz , brighten school, brighten learning center, Ilkham Sabirov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
