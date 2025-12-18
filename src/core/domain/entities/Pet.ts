export interface Breed {
    id: number;
    name: string;
    species: "DOG" | "CAT" | "BIRD" | "OTHER";
    description?: string;
}

export class Pet {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly breed: Breed,
        public readonly birthDate: string | null,
        public readonly ownerId: number
    ) {}

    getDetailedAge(): { years: number; months: number; days: number } | null {
        if (!this.birthDate) return null;

        const birth = new Date(this.birthDate);
        const today = new Date();

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    getAge(): string | null {
        const age = this.getDetailedAge();
        if (!age) return null;

        const parts: string[] = [];

        if (age.years > 0) {
            parts.push(`${age.years} ${age.years === 1 ? "ano" : "anos"}`);
        }

        if (age.months > 0) {
            parts.push(`${age.months} ${age.months === 1 ? "mês" : "meses"}`);
        }

        if (age.days > 0 || parts.length === 0) {
            parts.push(`${age.days} ${age.days === 1 ? "dia" : "dias"}`);
        }

        return parts.join(", ");
    }

    getSpeciesLabel(): string {
        const speciesMap: Record<string, string> = {
            DOG: "Cachorro",
            CAT: "Gato",
            BIRD: "Pássaro",
            OTHER: "Outro",
        };
        return speciesMap[this.breed.species] || "Desconhecido";
    }

    isAdult(): boolean {
        const age = this.getDetailedAge();
        if (age === null) return false;

        return age.years >= 1;
    }
}
