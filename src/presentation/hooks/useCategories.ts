"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryRepository } from "@/infrastructure/http/ProductRepositoryImpl";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => categoryRepository.findAll(),
    });
}
