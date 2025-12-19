"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authRepository } from "@/infrastructure/http/AuthRepositoryImpl";
import type { LoginCredentials, RegisterData } from "@/core/domain/repositories/IAuthRepository";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/presentation/lib/constants";

export function useAuth() {
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const isAuthPage = pathname === "/login" || pathname === "/register";

    const { data: user, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: () => authRepository.getCurrentUser(),
        retry: false,
        enabled: !isAuthPage,
    });

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginCredentials) => authRepository.login(credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/dashboard");
        },
    });

    const registerMutation = useMutation({
        mutationFn: (data: RegisterData) => authRepository.register(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push(ROUTES.DASHBOARD);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: () => authRepository.logout(),
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            router.push("/login");
        },
    });

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        loginError: loginMutation.error,
        registerError: registerMutation.error,
    };
}
