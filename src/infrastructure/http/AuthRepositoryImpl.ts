import { apiClient } from "./api-client";
import { API_ENDPOINTS } from "@/presentation/lib/constants";
import {
    IAuthRepository,
    LoginCredentials,
    RegisterData,
} from "@/core/domain/repositories/IAuthRepository";
import { Customer, User } from "@/core/domain/entities/Customer";

interface UserDTO {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface CustomerDTO {
    id: number;
    user: UserDTO;
    cpf: string;
    phone: string;
    address: string;
}

export class AuthRepositoryImpl implements IAuthRepository {
    async login(credentials: LoginCredentials): Promise<Customer> {
        const loginData = {
            username: credentials.email,
            password: credentials.password,
        };

        const response = await apiClient.post<{ key: string }>(API_ENDPOINTS.AUTH.LOGIN, loginData);

        if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", response.key);
        }

        const customer = await this.getCurrentUser();
        if (!customer) {
            throw new Error("Failed to get user after login");
        }

        return customer;
    }

    async logout(): Promise<void> {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
        }
    }

    async register(data: RegisterData): Promise<Customer> {
        try {
            const response = await apiClient.post<{
                user: {
                    id: number;
                    username: string;
                    email: string;
                    first_name: string;
                    last_name: string;
                };
                customer: CustomerDTO;
                token: string;
            }>(API_ENDPOINTS.AUTH.REGISTER_COMPLETE, {
                username: data.username,
                email: data.email,
                password: data.password1,
                first_name: data.firstName,
                last_name: data.lastName,
                cpf: data.cpf,
                phone: data.phone,
                address: data.address,
            });

            if (typeof window !== "undefined") {
                localStorage.setItem("auth_token", response.token);
            }

            return this.toDomain(response.customer);
        } catch (error: unknown) {
            const axiosError = error as { response?: { data?: Record<string, unknown> } };
            if (axiosError.response?.data) {
                const errors = axiosError.response.data;

                const errorMessages: string[] = [];
                for (const [field, messages] of Object.entries(errors)) {
                    if (Array.isArray(messages)) {
                        errorMessages.push(`${field}: ${messages.join(", ")}`);
                    } else {
                        errorMessages.push(`${field}: ${messages}`);
                    }
                }

                throw new Error(errorMessages.join("; "));
            }

            throw new Error("Erro ao criar conta. Tente novamente.");
        }
    }

    async getCurrentUser(): Promise<Customer | null> {
        try {
            const data = await apiClient.get<CustomerDTO>(API_ENDPOINTS.AUTH.CURRENT_USER);
            return this.toDomain(data);
        } catch {
            return null;
        }
    }

    private toDomain(dto: CustomerDTO): Customer {
        const user: User = {
            id: dto.user.id,
            username: dto.user.username,
            firstName: dto.user.first_name,
            lastName: dto.user.last_name,
            email: dto.user.email,
        };

        return new Customer(dto.id, user, dto.cpf, dto.phone, dto.address);
    }
}

export const authRepository = new AuthRepositoryImpl();
