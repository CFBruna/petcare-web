"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/presentation/components/ui/card";
import { useAuth } from "@/presentation/hooks/useAuth";
import { Heart } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { login, loginError } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login({ email, password });
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Heart className="h-12 w-12 text-primary-600" fill="currentColor" />
                        <span className="font-heading text-4xl font-bold text-primary-700">
                            PetCare
                        </span>
                    </div>
                    <p className="text-neutral-600">
                        Acesse sua conta para gerenciar o cuidado do seu pet
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Entrar</CardTitle>
                        <CardDescription>
                            Digite seu email e senha para acessar o sistema
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email ou Nome de Usuário</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="seu@email.com ou usuario"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {loginError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">
                                        Email ou senha inválidos. Tente novamente.
                                    </p>
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Entrando..." : "Entrar"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-neutral-600">Não tem uma conta? </span>
                            <Link
                                href="/register"
                                className="text-primary-600 font-semibold hover:text-primary-700"
                            >
                                Criar conta
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900">
                        ← Voltar para o início
                    </Link>
                </div>
            </div>
        </div>
    );
}
