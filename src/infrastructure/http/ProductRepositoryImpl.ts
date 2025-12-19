import { apiClient } from "./api-client";
import { API_ENDPOINTS } from "@/presentation/lib/constants";
import {
    IProductRepository,
    ICategoryRepository,
    IBrandRepository,
    ProductFilters,
} from "@/core/domain/repositories/IProductRepository";
import { Product, Category, Brand } from "@/core/domain/entities/Product";

interface ProductDTO {
    id: number;
    name: string;
    sku: string;
    barcode: string | null;
    brand: number | null;
    category: number | null;
    description: string;
    price: string;
    final_price: string;
    total_stock: number;
    image: string | null;
}

export class ProductRepositoryImpl implements IProductRepository {
    async findAll(filters?: ProductFilters): Promise<Product[]> {
        let url = API_ENDPOINTS.PRODUCTS;
        const params = new URLSearchParams();

        if (filters?.category) params.append("category", filters.category.toString());
        if (filters?.brand) params.append("brand", filters.brand.toString());
        if (filters?.search) params.append("search", filters.search);
        if (filters?.inStock) params.append("in_stock", "true");

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const data = await apiClient.get<any>(url);

        const items = Array.isArray(data) ? data : data.results || [];

        return items.map(this.toDomain);
    }

    async findById(id: number): Promise<Product | null> {
        try {
            const data = await apiClient.get<ProductDTO>(`${API_ENDPOINTS.PRODUCTS}${id}/`);
            return this.toDomain(data);
        } catch {
            return null;
        }
    }

    async search(query: string): Promise<Product[]> {
        const data = await apiClient.get<ProductDTO[]>(`${API_ENDPOINTS.PRODUCTS}?search=${query}`);
        return data.map(this.toDomain);
    }

    private toDomain(dto: ProductDTO): Product {
        const brand: Brand | null = dto.brand ? { id: dto.brand, name: "" } : null;
        const category: Category | null = dto.category ? { id: dto.category, name: "" } : null;

        return new Product(
            dto.id,
            dto.name,
            dto.sku,
            dto.barcode,
            brand,
            category,
            dto.description,
            parseFloat(dto.price),
            parseFloat(dto.final_price),
            dto.total_stock,
            dto.image
        );
    }
}

export class CategoryRepositoryImpl implements ICategoryRepository {
    async findAll(): Promise<Category[]> {
        return await apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES);
    }
}

export class BrandRepositoryImpl implements IBrandRepository {
    async findAll(): Promise<Brand[]> {
        return await apiClient.get<Brand[]>(API_ENDPOINTS.BRANDS);
    }
}

export const productRepository = new ProductRepositoryImpl();
export const categoryRepository = new CategoryRepositoryImpl();
export const brandRepository = new BrandRepositoryImpl();
