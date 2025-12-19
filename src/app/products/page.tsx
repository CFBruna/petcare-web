"use client";

import { PublicHeader } from "@/presentation/components/layouts/PublicHeader";
import { PublicFooter } from "@/presentation/components/layouts/PublicFooter";
import { useProducts } from "@/presentation/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/presentation/lib/utils";
import Image from "next/image";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("category");
    const searchQuery = searchParams.get("search");

    const { data: products, isLoading } = useProducts({
        category: categoryId ? Number(categoryId) : undefined,
        search: searchQuery || undefined,
    });

    return (
        <div className="min-h-screen bg-neutral-50">
            <PublicHeader />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
                        {searchQuery
                            ? `Pesquisando por: "${searchQuery}"`
                            : categoryId
                              ? "Produtos da Categoria"
                              : "Todos os Produtos"}
                    </h1>
                    <p className="text-neutral-600">{products?.length || 0} produtos encontrados</p>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-primary-600 border-r-transparent mb-2"></div>
                        <p className="text-neutral-600 text-sm">Carregando produtos...</p>
                    </div>
                ) : products && products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Card key={product.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="aspect-square bg-neutral-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group">
                                        {product.hasDiscount() && (
                                            <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded shadow-sm z-10">
                                                -{product.getDiscountPercentage()}%
                                            </span>
                                        )}
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
                                Nenhum produto encontrado
                            </h3>
                            <p className="text-neutral-600">
                                Tente ajustar seus filtros ou volte mais tarde.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </main>
            <PublicFooter />
        </div>
    );
}
