"use client";

import { PublicHeader } from "@/presentation/components/layouts/PublicHeader";
import { PublicFooter } from "@/presentation/components/layouts/PublicFooter";
import { useCategories } from "@/presentation/hooks/useCategories";
import Link from "next/link";
import { Package } from "lucide-react";
import { Card, CardContent } from "@/presentation/components/ui/card";

export default function CategoriesPage() {
    const { data: categories, isLoading } = useCategories();

    return (
        <div className="min-h-screen bg-neutral-50">
            <PublicHeader />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
                        Categorias
                    </h1>
                    <p className="text-neutral-600">Navegue pelos nossos departamentos</p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="h-32 bg-neutral-100 rounded-lg animate-pulse"
                            ></div>
                        ))}
                    </div>
                ) : categories && categories.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.id}`}
                                className="group block"
                            >
                                <div className="bg-white border border-neutral-200 rounded-xl p-6 text-center hover:border-primary-500 hover:shadow-md transition-all h-full flex flex-col items-center justify-center gap-4 aspect-square">
                                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        <Package className="h-8 w-8" />
                                    </div>
                                    <span className="font-medium text-lg text-neutral-900 group-hover:text-primary-700">
                                        {category.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Package className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                Nenhuma categoria encontrada
                            </h3>
                        </CardContent>
                    </Card>
                )}
            </main>
            <PublicFooter />
        </div>
    );
}
