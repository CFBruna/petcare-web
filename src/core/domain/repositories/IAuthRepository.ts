import { Customer } from "../entities/Customer";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password1: string;
    password2: string;
    firstName: string;
    lastName: string;
    cpf: string;
    phone: string;
    address: string;
}

export interface IAuthRepository {
    login(credentials: LoginCredentials): Promise<Customer>;
    logout(): Promise<void>;
    register(data: RegisterData): Promise<Customer>;
    getCurrentUser(): Promise<Customer | null>;
}
