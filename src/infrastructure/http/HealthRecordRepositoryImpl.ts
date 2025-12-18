import { apiClient } from "./api-client";
import { API_ENDPOINTS } from "@/presentation/lib/constants";
import {
    IHealthRecordRepository,
    CreateHealthRecordDTO,
} from "@/core/domain/repositories/IHealthRecordRepository";
import { HealthRecord, HealthRecordType } from "@/core/domain/entities/HealthRecord";

interface HealthRecordDTO {
    id: number;
    pet: number;
    record_type: HealthRecordType;
    description: string;
    record_date: string;
    next_due_date: string | null;
    created_by_username: string;
    created_at: string;
    updated_at: string;
}

export class HealthRecordRepositoryImpl implements IHealthRecordRepository {
    async findByPetId(petId: number): Promise<HealthRecord[]> {
        const data = await apiClient.get<HealthRecordDTO[]>(
            `${API_ENDPOINTS.HEALTH_RECORDS}?pet=${petId}`
        );
        return data.map(this.toDomain);
    }

    async create(dto: CreateHealthRecordDTO): Promise<HealthRecord> {
        const data = await apiClient.post<HealthRecordDTO>(API_ENDPOINTS.HEALTH_RECORDS, {
            pet: dto.petId,
            record_type: dto.recordType,
            description: dto.description,
            record_date: dto.recordDate,
            next_due_date: dto.nextDueDate || null,
        });
        return this.toDomain(data);
    }

    private toDomain(dto: HealthRecordDTO): HealthRecord {
        return new HealthRecord(
            dto.id,
            dto.pet,
            dto.record_type,
            dto.description,
            dto.record_date,
            dto.next_due_date,
            dto.created_by_username,
            dto.created_at,
            dto.updated_at
        );
    }
}

export const healthRecordRepository = new HealthRecordRepositoryImpl();
