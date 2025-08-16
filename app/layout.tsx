import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://brightenschool.uz"),
    title: "Brighten School",
    description:
        "Brighten School - create your future with us!",
    authors: [{ name: "", url: "https://brightenschool.uz" }],
    icons: { icon: "/logo.svg" },
    openGraph: {
        title: "Brighten School",
        description:
            "Brighten School - create your future with us!",
        type: "website",
        url: "https://brightenschool.uz",
        images: "https://opengraph.b-cdn.net/production/images/0d190e7f-9a65-4eae-bc09-c8d0e0e912f9.png?token=5r0yj2RyoWj1_6VgIspEfFhVg5un1dz6NmL0NIZTb-0&height=630&width=1120&expires=33291346433",
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
