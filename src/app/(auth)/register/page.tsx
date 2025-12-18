"use client";

import { useState } from "react";
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

export default function RegisterPage() {
    const { register, registerError } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
        firstName: "",
        lastName: "",
        cpf: "",
        phone: "",
        address: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            await register(formData);
        } catch (error: any) {
            const message =
                error?.message || "Erro ao criar conta. Verifique os dados e tente novamente.";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50 px-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Heart className="h-12 w-12 text-primary-600" fill="currentColor" />
                        <span className="font-heading text-4xl font-bold text-primary-700">
                            PetCare
                        </span>
                    </div>
                    <p className="text-neutral-600">
                        Crie sua conta e comece a cuidar melhor do seu pet
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Criar Conta</CardTitle>
                        <CardDescription>
                            Preencha os dados abaixo para criar sua conta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Nome</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        placeholder="João"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Sobrenome</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Silva"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Nome de Usuário</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="joaosilva"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="joao@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cpf">CPF</Label>
                                    <Input
                                        id="cpf"
                                        name="cpf"
                                        placeholder="000.000.000-00"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="(11) 99999-9999"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Endereço</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="Rua Exemplo, 123 - Bairro - Cidade"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password1">Senha</Label>
                                    <Input
                                        id="password1"
                                        name="password1"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password1}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password2">Confirmar Senha</Label>
                                    <Input
                                        id="password2"
                                        name="password2"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{errorMessage}</p>
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Criando conta..." : "Criar Conta"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-neutral-600">Já tem uma conta? </span>
                            <Link
                                href="/login"
                                className="text-primary-600 font-semibold hover:text-primary-700"
                            >
                                Entrar
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
