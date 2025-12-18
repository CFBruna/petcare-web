export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export class Customer {
    constructor(
        public readonly id: number,
        public readonly user: User,
        public readonly cpf: string,
        public readonly phone: string,
        public readonly address: string
    ) {}

    get fullName(): string {
        return `${this.user.firstName} ${this.user.lastName}`.trim() || this.user.username;
    }

    get email(): string {
        return this.user.email;
    }

    formatPhone(): string {
        const cleaned = this.phone.replace(/\D/g, "");
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return this.phone;
    }
}
