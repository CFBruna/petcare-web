import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/presentation/lib/constants";

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.client.interceptors.request.use(
            (config) => {
                if (typeof window !== "undefined") {
                    const token = localStorage.getItem("auth_token");
                    if (token) {
                        config.headers["Authorization"] = `Token ${token}`;
                    }
                }

                const csrfToken = this.getCSRFToken();
                if (csrfToken && config.method !== "get") {
                    config.headers["X-CSRFToken"] = csrfToken;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    if (typeof window !== "undefined") {
                        window.location.href = "/login";
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    private getCSRFToken(): string | null {
        if (typeof document === "undefined") return null;

        const name = "csrftoken";
        const cookies = document.cookie.split(";");

        for (const cookie of cookies) {
            const trimmed = cookie.trim();
            if (trimmed.startsWith(name + "=")) {
                return trimmed.substring(name.length + 1);
            }
        }

        return null;
    }

    public getClient(): AxiosInstance {
        return this.client;
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.put<T>(url, data, config);
        return response.data;
    }

    async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.patch<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.delete<T>(url, config);
        return response.data;
    }
}

export const apiClient = new ApiClient();
