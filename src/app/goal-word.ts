export class GoalWord {
    readonly value: string;
    readonly letters: Set<string>;

    constructor(value: string) {
        this.value = value;
        this.letters = new Set<string>();
        for (var i = 0; i < this.value.length; i++) {
            this.letters.add(this.value.charAt(i));
        }
    }

    contains(char: string): boolean {
        return this.letters.has(char);
    }

    getValue(): string {
        return this.value;
    }

    getAt(i: Number): string {
        return this.value.charAt(i.valueOf());
    }

    length(): Number {
        return this.value.length;
    }
}