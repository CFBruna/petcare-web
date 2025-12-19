"use client";

import Link from "next/link";
import { ShoppingBag, Package, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useProducts } from "@/presentation/hooks/useProducts";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { formatCurrency } from "@/presentation/lib/utils";

export default function HomePage() {
    const [mounted, setMounted] = useState(false);
    const { data: products, isLoading } = useProducts();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent mb-4"></div>
                    <p className="text-neutral-600">Carregando loja...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Heart className="h-8 w-8 text-primary-600" fill="currentColor" />
                            <span className="font-heading text-2xl font-bold text-primary-700">
                                PetCare
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/login">
                                <Button variant="outline">Entrar</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Criar Conta</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-2">
                        Loja de Produtos
                    </h1>
                    <p className="text-neutral-600">Encontre tudo para o bem-estar do seu pet</p>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent mb-4"></div>
                        <p className="text-neutral-600">Carregando produtos...</p>
                    </div>
                ) : products && products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Card key={product.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="aspect-square bg-neutral-100 rounded-lg mb-4 flex items-center justify-center">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <Package className="h-16 w-16 text-neutral-300" />
                                        )}
                                    </div>
                                    <CardTitle className="text-lg line-clamp-2">
                                        {product.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                                        {product.description}
                                    </p>
                                    <div className="space-y-2">
                                        {product.hasDiscount() && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-neutral-500 line-through">
                                                    {formatCurrency(product.price)}
                                                </span>
                                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                                                    -{product.getDiscountPercentage()}%
                                                </span>
                                            </div>
                                        )}
                                        <div className="text-2xl font-bold text-neutral-900">
                                            {formatCurrency(product.finalPrice)}
                                        </div>
                                        <p className={`text-xs ${product.getStockColor()}`}>
                                            {product.getStockLabel()}
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full gap-2"
                                        disabled={!product.isInStock()}
                                    >
                                        <ShoppingBag className="h-4 w-4" />
                                        {product.isInStock()
                                            ? "Adicionar ao Carrinho"
                                            : "Fora de Estoque"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <ShoppingBag className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                Nenhum produto disponível
                            </h3>
                            <p className="text-neutral-600">Em breve teremos novos produtos!</p>
                        </CardContent>
                    </Card>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-neutral-900 text-neutral-300 py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm">© 2025 PetCare. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
