import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "PetCare - Sistema de Gestão para Pet Shop",
    description:
        "Sistema completo de gestão para pet shops com agendamento, vendas, e prontuário de saúde dos pets.",
    keywords: ["pet shop", "veterinária", "agendamento", "pets", "saúde animal"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.variable} ${outfit.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
