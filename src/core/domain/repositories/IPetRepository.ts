import { Pet, Breed } from "../entities/Pet";

export interface CreatePetDTO {
    name: string;
    breedId: number;
    birthDate?: string;
}

export interface UpdatePetDTO {
    name?: string;
    breedId?: number;
    birthDate?: string;
}

export interface IPetRepository {
    findAll(): Promise<Pet[]>;
    findById(id: number): Promise<Pet | null>;
    create(data: CreatePetDTO): Promise<Pet>;
    update(id: number, data: UpdatePetDTO): Promise<Pet>;
    delete(id: number): Promise<void>;
}

export interface IBreedRepository {
    findAll(): Promise<Breed[]>;
    findBySpecies(species: string): Promise<Breed[]>;
}
