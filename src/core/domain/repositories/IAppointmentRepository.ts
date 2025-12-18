import { Appointment, Service } from "../entities/Appointment";

export interface CreateAppointmentDTO {
    petId: number;
    serviceId: number;
    scheduleDate: string;
    scheduleTime: string;
    notes?: string;
}

export interface IAppointmentRepository {
    findAll(): Promise<Appointment[]>;
    findById(id: number): Promise<Appointment | null>;
    findByStatus(status: string): Promise<Appointment[]>;
    create(data: CreateAppointmentDTO): Promise<Appointment>;
    cancel(id: number): Promise<Appointment>;
    getAvailableSlots(date: string, serviceId: number): Promise<string[]>;
}

export interface IServiceRepository {
    findAll(): Promise<Service[]>;
    findById(id: number): Promise<Service | null>;
}
