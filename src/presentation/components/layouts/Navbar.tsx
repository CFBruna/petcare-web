"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, ShoppingBag, Heart, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/presentation/hooks/useAuth";
import { cn } from "@/presentation/lib/utils";

export default function Navbar() {
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Meus Pets", href: "/pets", icon: Heart },
        { name: "Agendamentos", href: "/appointments", icon: Calendar },
        { name: "Loja", href: "/store", icon: ShoppingBag },
    ];

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Heart className="h-8 w-8 text-primary-600" fill="currentColor" />
                        <span className="font-heading text-2xl font-bold text-primary-700">
                            PetCare
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary-50 text-primary-700"
                                                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-neutral-600">
                                    Olá, {user?.user.firstName || user?.user.username}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sair
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Entrar
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">Criar Conta</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    {isAuthenticated && (
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    )}
                </div>

                {/* Mobile Navigation */}
                {isAuthenticated && mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary-50 text-primary-700"
                                            : "text-neutral-600 hover:bg-neutral-50"
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="pt-4 border-t border-neutral-200">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-5 w-5" />
                                Sair
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
