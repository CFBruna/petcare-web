"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/presentation/components/ui/button";
import { useRouter } from "next/navigation";

export function PublicHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== "undefined") {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    setIsVisible(false);
                    setIsMenuOpen(false);
                } else {
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar);
            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);

    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const query = (e.target as HTMLInputElement).value;
            if (query.trim()) {
                router.push(`/products?search=${encodeURIComponent(query)}`);
                if (typeof window !== "undefined") {
                    setIsMenuOpen(false);
                }
            }
        }
    };

    return (
        <header
            className={`bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm relative transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <div className="relative w-12 h-12">
                            <Image
                                src="/images/logo.svg"
                                alt="PetCare Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-2xl font-heading font-bold text-neutral-900 hidden sm:block">
                            PetCare
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-4 hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-3 flex-shrink-0">
                        <Link href="/login">
                            <Button variant="outline">Entrar</Button>
                        </Link>
                        <Link href="/register">
                            <Button>Criar Conta</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu and Search Toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button className="p-2 text-neutral-600">
                            <Search className="h-6 w-6" />
                        </button>
                        <button
                            className="p-2 text-neutral-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar (Visible when needed, currently simplified) */}
                <div className="md:hidden mt-4 pb-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-200 shadow-lg md:hidden p-4 flex flex-col gap-3">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                            Entrar
                        </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full">Criar Conta</Button>
                    </Link>
                </div>
            )}
        </header>
    );
}
