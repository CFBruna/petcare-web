import { apiClient } from "./api-client";
import { API_ENDPOINTS } from "@/presentation/lib/constants";
import {
    IPetRepository,
    IBreedRepository,
    CreatePetDTO,
    UpdatePetDTO,
} from "@/core/domain/repositories/IPetRepository";
import { Pet, Breed } from "@/core/domain/entities/Pet";

interface PetDTO {
    id: number;
    name: string;
    breed: {
        id: number;
        name: string;
        species: "DOG" | "CAT" | "BIRD" | "OTHER";
        description?: string;
    };
    birth_date: string | null;
    owner: number;
}

interface BreedDTO {
    id: number;
    name: string;
    species: "DOG" | "CAT" | "BIRD" | "OTHER";
    description?: string;
}

export class PetRepositoryImpl implements IPetRepository {
    async findAll(): Promise<Pet[]> {
        const data = await apiClient.get<PetDTO[]>(API_ENDPOINTS.PETS);
        return data.map(this.toDomain);
    }

    async findById(id: number): Promise<Pet | null> {
        try {
            const data = await apiClient.get<PetDTO>(`${API_ENDPOINTS.PETS}${id}/`);
            return this.toDomain(data);
        } catch {
            return null;
        }
    }

    async create(dto: CreatePetDTO): Promise<Pet> {
        const data = await apiClient.post<PetDTO>(API_ENDPOINTS.PETS, {
            name: dto.name,
            breed_id: dto.breedId,
            birth_date: dto.birthDate || null,
        });
        return this.toDomain(data);
    }

    async update(id: number, dto: UpdatePetDTO): Promise<Pet> {
        const data = await apiClient.patch<PetDTO>(`${API_ENDPOINTS.PETS}${id}/`, {
            ...(dto.name && { name: dto.name }),
            ...(dto.breedId && { breed_id: dto.breedId }),
            ...(dto.birthDate !== undefined && { birth_date: dto.birthDate || null }),
        });
        return this.toDomain(data);
    }

    async delete(id: number): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.PETS}${id}/`);
    }

    private toDomain(dto: PetDTO): Pet {
        return new Pet(dto.id, dto.name, dto.breed, dto.birth_date, dto.owner);
    }
}

export class BreedRepositoryImpl implements IBreedRepository {
    async findAll(): Promise<Breed[]> {
        const data = await apiClient.get<BreedDTO[]>(API_ENDPOINTS.BREEDS);
        return data;
    }

    async findBySpecies(species: string): Promise<Breed[]> {
        const data = await apiClient.get<BreedDTO[]>(`${API_ENDPOINTS.BREEDS}?species=${species}`);
        return data;
    }
}

export const petRepository = new PetRepositoryImpl();
export const breedRepository = new BreedRepositoryImpl();
