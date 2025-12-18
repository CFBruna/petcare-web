export const APP_NAME = "PetCare" as const;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const API_V1_PATH = "/api/v1" as const;

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
    PETS: "/pets",
    APPOINTMENTS: "/appointments",
    STORE: "/store",
} as const;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_V1_PATH}/auth/login/`,
        LOGOUT: `${API_V1_PATH}/auth/logout/`,
        REGISTER: `${API_V1_PATH}/auth/registration/`,
        REGISTER_COMPLETE: `${API_V1_PATH}/accounts/register/`,
        USER: `${API_V1_PATH}/auth/user/`,
        CURRENT_USER: `${API_V1_PATH}/accounts/me/`,
    },
    CUSTOMERS: `${API_V1_PATH}/accounts/customers/`,
    PETS: `${API_V1_PATH}/pets/pets/`,
    BREEDS: `${API_V1_PATH}/pets/breeds/`,
    APPOINTMENTS: `${API_V1_PATH}/schedule/appointments/`,
    SERVICES: `${API_V1_PATH}/schedule/services/`,
    HEALTH_RECORDS: `${API_V1_PATH}/health/records/`,
    PRODUCTS: `${API_V1_PATH}/store/products/`,
    CATEGORIES: `${API_V1_PATH}/store/categories/`,
    BRANDS: `${API_V1_PATH}/store/brands/`,
} as const;
