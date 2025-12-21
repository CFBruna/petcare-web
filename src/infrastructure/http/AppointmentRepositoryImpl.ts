import { apiClient } from "./api-client";
import { API_ENDPOINTS } from "@/presentation/lib/constants";
import {
    IAppointmentRepository,
    IServiceRepository,
    CreateAppointmentDTO,
} from "@/core/domain/repositories/IAppointmentRepository";
import { Appointment, Service, AppointmentStatus } from "@/core/domain/entities/Appointment";

interface AppointmentDTO {
    id: number;
    pet: number;
    pet_name: string;
    service: number;
    service_name: string;
    service_duration: number;
    schedule_time: string;
    status: AppointmentStatus;
    notes: string;
}

interface ServiceDTO {
    id: number;
    name: string;
    description: string;
    price: string;
    duration_minutes: number;
}

export class AppointmentRepositoryImpl implements IAppointmentRepository {
    async findAll(): Promise<Appointment[]> {
        const data = await apiClient.get<AppointmentDTO[]>(API_ENDPOINTS.APPOINTMENTS);
        return data.map(this.toDomain);
    }

    async findById(id: number): Promise<Appointment | null> {
        try {
            const data = await apiClient.get<AppointmentDTO>(`${API_ENDPOINTS.APPOINTMENTS}${id}/`);
            return this.toDomain(data);
        } catch {
            return null;
        }
    }

    async findByStatus(status: string): Promise<Appointment[]> {
        const data = await apiClient.get<AppointmentDTO[]>(
            `${API_ENDPOINTS.APPOINTMENTS}?status=${status}`
        );
        return data.map(this.toDomain);
    }

    async create(dto: CreateAppointmentDTO): Promise<Appointment> {
        const data = await apiClient.post<AppointmentDTO>(API_ENDPOINTS.APPOINTMENTS, {
            pet: dto.petId,
            service: dto.serviceId,
            schedule_date: dto.scheduleDate,
            schedule_time_input: dto.scheduleTime,
            notes: dto.notes || "",
        });
        return this.toDomain(data);
    }

    async cancel(id: number): Promise<Appointment> {
        const data = await apiClient.post<AppointmentDTO>(
            `${API_ENDPOINTS.APPOINTMENTS}${id}/cancel/`,
            {}
        );
        return this.toDomain(data);
    }

    async getAvailableSlots(date: string, serviceId: number): Promise<string[]> {
        const data = await apiClient.get<string[]>(
            `${API_ENDPOINTS.AVAILABLE_SLOTS}?date=${date}&service_id=${serviceId}`
        );
        return data;
    }

    private toDomain(dto: AppointmentDTO): Appointment {
        const service: Service = {
            id: dto.service,
            name: dto.service_name,
            description: "",
            price: 0,
            durationMinutes: dto.service_duration,
        };

        return new Appointment(
            dto.id,
            dto.pet,
            dto.pet_name,
            service,
            dto.schedule_time,
            dto.status,
            dto.notes
        );
    }
}

export class ServiceRepositoryImpl implements IServiceRepository {
    async findAll(): Promise<Service[]> {
        const data = await apiClient.get<ServiceDTO[]>(API_ENDPOINTS.SERVICES);
        return data.map(this.toDomain);
    }

    async findById(id: number): Promise<Service | null> {
        try {
            const data = await apiClient.get<ServiceDTO>(`${API_ENDPOINTS.SERVICES}${id}/`);
            return this.toDomain(data);
        } catch {
            return null;
        }
    }

    private toDomain(dto: ServiceDTO): Service {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            price: parseFloat(dto.price),
            durationMinutes: dto.duration_minutes,
        };
    }
}

export const appointmentRepository = new AppointmentRepositoryImpl();
export const serviceRepository = new ServiceRepositoryImpl();
