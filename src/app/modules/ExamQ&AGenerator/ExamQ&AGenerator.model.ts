import mongoose, { Model, Schema } from "mongoose";
import { Difficulty, QuestionType } from "./ExamQ&AGenerator.interface";

export interface QuestionDocument {
    type: QuestionType;
    difficulty: Difficulty;
    question: string;
    options?: string[];
    answer: string;
}

const QuestionSchema = new Schema<QuestionDocument>(
    {
        type: {
            type: String,
            enum: ["mcq", "short", "truefalse"],
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            validate: {
                validator: function (v: string[]) {
                    if (this.type === "mcq") {
                        return Array.isArray(v) && v.length === 4;
                    }
                    return true;
                },
                message: "MCQ questions must have 4 options",
            },
        },
        answer: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Question: Model<QuestionDocument> = mongoose.model<QuestionDocument>(
    "Question",
    QuestionSchema
);
