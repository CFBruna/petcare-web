"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Package, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { PublicHeader } from "@/presentation/components/layouts/PublicHeader";
import { PublicFooter } from "@/presentation/components/layouts/PublicFooter";
import { useProducts } from "@/presentation/hooks/useProducts";
import { useCategories } from "@/presentation/hooks/useCategories";
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
    const { data: products, isLoading: isLoadingProducts } = useProducts();
    const { data: categories, isLoading: isLoadingCategories } = useCategories();

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

    const featuredProducts = products
        ?.filter((p) => p.hasDiscount())
        .sort((a, b) => b.getDiscountPercentage() - a.getDiscountPercentage())
        .slice(0, 5);

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <PublicHeader />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
                {/* Hero Section */}
                <section className="bg-primary-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-lg">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                            Tudo para o seu pet ser mais feliz
                        </h1>
                        <p className="text-primary-100 mb-8 text-lg">
                            Rações, brinquedos, acessórios e muito mais com as melhores ofertas.
                        </p>
                        <Link href="/offers">
                            <Button
                                size="lg"
                                className="bg-white text-primary-900 hover:bg-primary-50 font-semibold"
                            >
                                Ver Ofertas
                            </Button>
                        </Link>
                    </div>
                    {/* Abstract shapes/pattern background */}
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 w-64 h-64 rounded-full bg-white blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 transform translate-y-1/4 w-48 h-48 rounded-full bg-primary-300 blur-2xl"></div>
                    </div>
                </section>

                {/* Categories */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-heading font-bold text-neutral-900">
                            Categorias
                        </h2>
                        <Link
                            href="/categories"
                            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                            Ver todas
                        </Link>
                    </div>
                    {isLoadingCategories ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="h-32 bg-neutral-100 rounded-lg animate-pulse"
                                ></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categories?.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/products?category=${category.id}`}
                                    className="group block"
                                >
                                    <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center hover:border-primary-500 hover:shadow-md transition-all h-full flex flex-col items-center justify-center gap-3">
                                        <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                            <Package className="h-6 w-6" />
                                        </div>
                                        <span className="font-medium text-neutral-900 group-hover:text-primary-700">
                                            {category.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Featured Products Section - Smaller & Compact */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-heading font-bold text-neutral-900">
                            Destaques da Semana
                        </h2>
                    </div>

                    {isLoadingProducts ? (
                        <div className="text-center py-8">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-primary-600 border-r-transparent mb-2"></div>
                        </div>
                    ) : featuredProducts && featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {featuredProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    className="flex flex-col border-primary-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="relative">
                                        <div className="aspect-square bg-neutral-100 rounded-t-lg flex items-center justify-center relative overflow-hidden group">
                                            {product.hasDiscount() && (
                                                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded shadow-sm z-10">
                                                    -{product.getDiscountPercentage()}%
                                                </span>
                                            )}

                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="relative w-full h-full p-4">
                                                    <Image
                                                        src="/images/logo-products.png"
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain opacity-50"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <CardContent className="flex-1 p-3">
                                        <CardTitle className="text-sm line-clamp-2 mb-2 h-10">
                                            {product.name}
                                        </CardTitle>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-neutral-500 line-through">
                                                    {formatCurrency(product.price)}
                                                </span>
                                            </div>
                                            <div className="text-lg font-bold text-primary-700">
                                                {formatCurrency(product.finalPrice)}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-3 pt-0">
                                        <Button size="sm" className="w-full gap-2 text-xs h-8">
                                            <ShoppingBag className="h-3 w-3" />
                                            Comprar
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-neutral-500 text-sm">
                            Nenhuma oferta em destaque no momento.
                        </div>
                    )}
                </section>

                {/* All Products Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-heading font-bold text-neutral-900">
                            Todos os Produtos
                        </h2>
                        <Link
                            href="/products"
                            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                            Ver todos
                        </Link>
                    </div>
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.slice(0, 8).map((product) => (
                                <Card key={product.id} className="flex flex-col">
                                    <CardHeader>
                                        <div className="aspect-square bg-neutral-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group">
                                            {product.hasDiscount() && (
                                                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded shadow-sm z-10">
                                                    -{product.getDiscountPercentage()}%
                                                </span>
                                            )}
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="relative w-full h-full p-6">
                                                    <Image
                                                        src="/images/logo-products.png"
                                                        alt={product.name}
                                                        fill
                                                        className="object-contain opacity-50"
                                                    />
                                                </div>
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
                </section>
            </main>

            {/* Footer */}
            <PublicFooter />
        </div>
    );
}
