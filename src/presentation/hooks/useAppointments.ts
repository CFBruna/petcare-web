"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    appointmentRepository,
    serviceRepository,
} from "@/infrastructure/http/AppointmentRepositoryImpl";
import type { CreateAppointmentDTO } from "@/core/domain/repositories/IAppointmentRepository";

export function useAppointments() {
    return useQuery({
        queryKey: ["appointments"],
        queryFn: () => appointmentRepository.findAll(),
    });
}

export function useAppointment(id: number) {
    return useQuery({
        queryKey: ["appointments", id],
        queryFn: () => appointmentRepository.findById(id),
        enabled: !!id,
    });
}

export function useAppointmentsByStatus(status: string) {
    return useQuery({
        queryKey: ["appointments", "status", status],
        queryFn: () => appointmentRepository.findByStatus(status),
        enabled: !!status,
    });
}

export function useServices() {
    return useQuery({
        queryKey: ["services"],
        queryFn: () => serviceRepository.findAll(),
    });
}

export function useAvailableSlots(date: string, serviceId: number) {
    return useQuery({
        queryKey: ["availableSlots", date, serviceId],
        queryFn: () => appointmentRepository.getAvailableSlots(date, serviceId),
        enabled: !!date && !!serviceId,
    });
}

export function useCreateAppointment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAppointmentDTO) => appointmentRepository.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
}

export function useCancelAppointment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => appointmentRepository.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
}
