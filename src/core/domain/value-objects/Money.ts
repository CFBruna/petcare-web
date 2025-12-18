export class Money {
    private constructor(private readonly _value: number) {
        if (_value < 0) {
            throw new Error("Money value cannot be negative");
        }
    }

    static fromNumber(value: number): Money {
        return new Money(value);
    }

    static fromString(value: string): Money {
        const parsed = parseFloat(value);
        if (isNaN(parsed)) {
            throw new Error("Invalid money value");
        }
        return new Money(parsed);
    }

    get value(): number {
        return this._value;
    }

    format(): string {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(this._value);
    }

    add(other: Money): Money {
        return new Money(this._value + other._value);
    }

    subtract(other: Money): Money {
        return new Money(Math.max(0, this._value - other._value));
    }

    multiply(factor: number): Money {
        return new Money(this._value * factor);
    }

    isGreaterThan(other: Money): boolean {
        return this._value > other._value;
    }

    equals(other: Money): boolean {
        return this._value === other._value;
    }
}
