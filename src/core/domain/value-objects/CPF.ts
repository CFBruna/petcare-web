export class CPF {
    private constructor(private readonly _value: string) {}

    static create(value: string): CPF {
        const cleaned = value.replace(/\D/g, "");

        if (cleaned.length !== 11) {
            throw new Error("CPF deve ter 11 dígitos");
        }

        if (!CPF.isValid(cleaned)) {
            throw new Error("CPF inválido");
        }

        return new CPF(cleaned);
    }

    private static isValid(cpf: string): boolean {
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    get value(): string {
        return this._value;
    }

    format(): string {
        return this._value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    equals(other: CPF): boolean {
        return this._value === other._value;
    }
}
