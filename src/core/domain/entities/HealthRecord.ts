export type HealthRecordType = "VACCINE" | "SURGERY" | "CONSULTATION" | "EXAM" | "OTHER";

export class HealthRecord {
    constructor(
        public readonly id: number,
        public readonly petId: number,
        public readonly recordType: HealthRecordType,
        public readonly description: string,
        public readonly recordDate: string,
        public readonly nextDueDate: string | null,
        public readonly createdByUsername: string,
        public readonly createdAt: string,
        public readonly updatedAt: string
    ) {}

    getTypeLabel(): string {
        const labels: Record<HealthRecordType, string> = {
            VACCINE: "Vacina",
            SURGERY: "Cirurgia",
            CONSULTATION: "Consulta",
            EXAM: "Exame",
            OTHER: "Outro",
        };
        return labels[this.recordType];
    }

    getTypeIcon(): string {
        const icons: Record<HealthRecordType, string> = {
            VACCINE: "💉",
            SURGERY: "⚕️",
            CONSULTATION: "🩺",
            EXAM: "🔬",
            OTHER: "📋",
        };
        return icons[this.recordType];
    }

    hasNextDueDate(): boolean {
        return this.nextDueDate !== null;
    }

    isOverdue(): boolean {
        if (!this.nextDueDate) return false;
        return new Date(this.nextDueDate) < new Date();
    }

    getRecordAge(): number {
        const today = new Date();
        const recordDate = new Date(this.recordDate);
        const diffTime = Math.abs(today.getTime() - recordDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}
