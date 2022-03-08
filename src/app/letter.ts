import { LetterState } from "./letter-state";

export interface Letter {
    value: string;
    state: LetterState;
}