export type QuestionType = "mcq" | "short" | "truefalse";
export type Difficulty = "easy" | "medium" | "hard";

export interface BaseQuestion {
    type: QuestionType;
    difficulty: Difficulty;
    question: string;
}

export interface MCQQuestion extends BaseQuestion {
    type: "mcq";
    options: string[];
    answer: string;
}

export interface ShortQuestion extends BaseQuestion {
    type: "short";
    answer: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
    type: "truefalse";
    answer: "true" | "false";
}

export type IQuestion = MCQQuestion | ShortQuestion | TrueFalseQuestion;
