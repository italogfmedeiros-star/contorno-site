import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Contorno — o cliente mais difícil do seu mercado, todo dia, antes das 9h",
  description:
    "A IA finge ser o cliente mais difícil do seu mercado — e um segundo agente te sussurra o que dizer, em tempo real, antes do 'vou pensar' virar desculpa de novo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
