"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { petRepository, breedRepository } from "@/infrastructure/http/PetRepositoryImpl";
import type { Pet, Breed } from "@/core/domain/entities/Pet";
import type { CreatePetDTO, UpdatePetDTO } from "@/core/domain/repositories/IPetRepository";

export function usePets() {
    return useQuery({
        queryKey: ["pets"],
        queryFn: () => petRepository.findAll(),
    });
}

export function usePet(id: number) {
    return useQuery({
        queryKey: ["pets", id],
        queryFn: () => petRepository.findById(id),
        enabled: !!id,
    });
}

export function useBreeds() {
    return useQuery<Breed[]>({
        queryKey: ["breeds"],
        queryFn: () => breedRepository.findAll(),
    });
}

export function useCreatePet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePetDTO) => petRepository.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pets"] });
        },
    });
}

export function useUpdatePet(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdatePetDTO) => petRepository.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pets"] });
            queryClient.invalidateQueries({ queryKey: ["pets", id] });
        },
    });
}

export function useDeletePet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => petRepository.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pets"] });
        },
    });
}
