"use client";

import { PublicHeader } from "@/presentation/components/layouts/PublicHeader";
import { PublicFooter } from "@/presentation/components/layouts/PublicFooter";
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
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OffersPage() {
    const { data: products, isLoading } = useProducts();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const discountedProducts = products?.filter((p) => p.hasDiscount()) || [];

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <PublicHeader />

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-neutral-900">
                            Ofertas Especiais
                        </h1>
                        <p className="text-neutral-600 mt-2">
                            Aproite os melhores descontos para o seu pet!
                        </p>
                    </div>
                    <div className="text-sm text-neutral-500">
                        {discountedProducts.length} produtos encontrados
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div
                                key={i}
                                className="h-96 bg-neutral-100 rounded-lg animate-pulse"
                            ></div>
                        ))}
                    </div>
                ) : discountedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {discountedProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="flex flex-col border-primary-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <CardHeader className="p-4 pb-0">
                                    <div className="aspect-square bg-neutral-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden group">
                                        <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shadow-sm z-10">
                                            -{product.getDiscountPercentage()}%
                                        </span>
                                        {product.image ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                unoptimized
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
                                    <CardTitle className="text-lg font-medium line-clamp-2 h-14 leading-tight">
                                        {product.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-2 flex-1">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-neutral-500 line-through">
                                                {formatCurrency(product.price)}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-bold text-primary-700">
                                            {formatCurrency(product.finalPrice)}
                                        </div>
                                    </div>
                                    <p className={`text-xs mt-2 ${product.getStockColor()}`}>
                                        {product.getStockLabel()}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button
                                        className="w-full gap-2"
                                        disabled={!product.isInStock()}
                                    >
                                        <ShoppingBag className="h-4 w-4" />
                                        {product.isInStock() ? "Comprar" : "Indisponível"}
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
                                Nenhuma oferta disponível
                            </h3>
                            <p className="text-neutral-600">
                                Volte em breve para conferir novas promoções!
                            </p>
                            <Link href="/products">
                                <Button variant="outline" className="mt-4">
                                    Ver todos os produtos
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </main>
            <PublicFooter />
        </div>
    );
}
