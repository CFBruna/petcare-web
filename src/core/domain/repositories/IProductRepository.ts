import { Product, Category, Brand } from "../entities/Product";

export interface ProductFilters {
    category?: number;
    brand?: number;
    search?: string;
    inStock?: boolean;
}

export interface IProductRepository {
    findAll(filters?: ProductFilters): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    search(query: string): Promise<Product[]>;
}

export interface ICategoryRepository {
    findAll(): Promise<Category[]>;
}

export interface IBrandRepository {
    findAll(): Promise<Brand[]>;
}
