import AppError from "../../errorHelpers/AppError";
import { IQuestion } from "./ExamQ&AGenerator.interface";
import { Question } from "./ExamQ&AGenerator.model";

const createQuestion = async (payload: IQuestion) => {
    try {
        return await Question.create(payload);
    } catch (error) {
        throw new AppError(500, "Failed to create question");
    }
};

// ---- Get all Questions ----
const getQuestions = async () => {
    try {
        const data = await Question.find().sort({ updatedAt: -1 });
        const totalQuestions = data.length;

        if (totalQuestions === 0) {
            throw new AppError(404, "No questions found");
        }

        return {
            metadata: {
                totalQuestions,
                mcq: data.filter((q) => q.type === "mcq").length,
                short: data.filter((q) => q.type === "short").length,
                truefalse: data.filter((q) => q.type === "truefalse").length,
            },
            data,
        };
    } catch (error) {
        throw new AppError(500, "Failed to fetch questions");
    }
};

// ---- Generate Random Questions ----
type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "mcq" | "short" | "truefalse";

export interface QuizSettings {
    difficulty: Difficulty;
    questionType: QuestionType;
    numberOfQuestions: number;
}

const generateQuestions = async ({
    difficulty,
    questionType,
    numberOfQuestions,
}: QuizSettings) => {
    try {
        const match: any = {
            difficulty,
            type: questionType,
        };

        // মোট কত প্রশ্ন আছে দেখে নাও
        const totalAvailable = await Question.countDocuments(match);

        if (totalAvailable === 0) {
            throw new AppError(
                404,
                `No questions found for type: ${questionType}, difficulty: ${difficulty}`
            );
        }

        // যেটুকু পাওয়া যাবে সেই অনুযায়ী নাও (min ব্যবহার করে)
        const limit = Math.min(numberOfQuestions, totalAvailable);

        const data = await Question.aggregate([
            { $match: match },
            { $sample: { size: limit } },
        ]);

        return {
            metadata: {
                totalGenerated: data.length,
                requested: numberOfQuestions,
                available: totalAvailable,
                filter: { difficulty, questionType, numberOfQuestions },
            },
            data,
        };
    } catch (error) {
        throw new AppError(500, "Failed to generate questions");
    }
};


export const ExamQAGeneratorServices = {
    createQuestion,
    getQuestions,
    generateQuestions,
};
