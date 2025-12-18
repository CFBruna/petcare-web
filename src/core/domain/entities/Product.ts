export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface Brand {
    id: number;
    name: string;
}

export class Product {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly sku: string,
        public readonly barcode: string | null,
        public readonly brand: Brand | null,
        public readonly category: Category | null,
        public readonly description: string,
        public readonly price: number,
        public readonly finalPrice: number,
        public readonly totalStock: number,
        public readonly image: string | null
    ) {}

    hasDiscount(): boolean {
        return this.finalPrice < this.price;
    }

    getDiscountPercentage(): number {
        if (!this.hasDiscount()) return 0;
        return Math.round(((this.price - this.finalPrice) / this.price) * 100);
    }

    isInStock(): boolean {
        return this.totalStock > 0;
    }

    isLowStock(): boolean {
        return this.totalStock > 0 && this.totalStock <= 5;
    }

    getStockLabel(): string {
        if (!this.isInStock()) return "Fora de estoque";
        if (this.isLowStock()) return `Últimas ${this.totalStock} unidades`;
        return `${this.totalStock} disponíveis`;
    }

    getStockColor(): string {
        if (!this.isInStock()) return "text-red-600";
        if (this.isLowStock()) return "text-secondary-600";
        return "text-accent-600";
    }
}
