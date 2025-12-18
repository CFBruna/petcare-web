export type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";

export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    durationMinutes: number;
}

export class Appointment {
    constructor(
        public readonly id: number,
        public readonly petId: number,
        public readonly petName: string,
        public readonly service: Service,
        public readonly scheduleTime: string,
        public readonly status: AppointmentStatus,
        public readonly notes: string
    ) {}

    isPending(): boolean {
        return this.status === "PENDING";
    }

    isConfirmed(): boolean {
        return this.status === "CONFIRMED";
    }

    isCompleted(): boolean {
        return this.status === "COMPLETED";
    }

    isCanceled(): boolean {
        return this.status === "CANCELED";
    }

    canBeCanceled(): boolean {
        return this.status === "PENDING" || this.status === "CONFIRMED";
    }

    getStatusLabel(): string {
        const labels: Record<AppointmentStatus, string> = {
            PENDING: "Pendente",
            CONFIRMED: "Confirmado",
            COMPLETED: "Concluído",
            CANCELED: "Cancelado",
        };
        return labels[this.status];
    }

    getStatusColor(): string {
        const colors: Record<AppointmentStatus, string> = {
            PENDING: "text-secondary-600 bg-secondary-100",
            CONFIRMED: "text-primary-600 bg-primary-100",
            COMPLETED: "text-accent-600 bg-accent-100",
            CANCELED: "text-neutral-600 bg-neutral-100",
        };
        return colors[this.status];
    }

    getScheduleDate(): Date {
        return new Date(this.scheduleTime);
    }

    isPast(): boolean {
        return new Date(this.scheduleTime) < new Date();
    }
}
