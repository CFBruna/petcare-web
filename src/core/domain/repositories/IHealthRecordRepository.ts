import { HealthRecord } from "../entities/HealthRecord";

export interface CreateHealthRecordDTO {
    petId: number;
    recordType: string;
    description: string;
    recordDate: string;
    nextDueDate?: string;
}

export interface IHealthRecordRepository {
    findByPetId(petId: number): Promise<HealthRecord[]>;
    create(data: CreateHealthRecordDTO): Promise<HealthRecord>;
}
