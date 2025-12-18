"use client";

import { useQuery } from "@tanstack/react-query";
import { productRepository } from "@/infrastructure/http/ProductRepositoryImpl";
import type { ProductFilters } from "@/core/domain/repositories/IProductRepository";

export function useProducts(filters?: ProductFilters) {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => productRepository.findAll(filters),
    });
}

export function useProduct(id: number) {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => productRepository.findById(id),
        enabled: !!id,
    });
}

export function useProductSearch(query: string) {
    return useQuery({
        queryKey: ["products", "search", query],
        queryFn: () => productRepository.search(query),
        enabled: !!query && query.length >= 3,
    });
}
