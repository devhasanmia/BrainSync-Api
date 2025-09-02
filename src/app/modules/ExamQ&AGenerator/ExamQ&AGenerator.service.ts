import { IQuestion } from "./ExamQ&AGenerator.interface";
import { Question } from "./ExamQ&AGenerator.model";

const createQuestion = async (payload: IQuestion) => {
    try {
        return await Question.create(payload);
    } catch (error) {
        throw new Error("Failed to create question");
    }
};

// ---- Get all Questions ----
const getQuestions = async () => {
    try {
        const data = await Question.find().sort({ updatedAt: -1 });
        const totalQuestions = data.length;

        // Optional metadata (like StudyPlanner did)
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
        throw new Error("Failed to fetch questions");
    }
};

// ---- Generate Random Questions ----
const generateQuestions = async ({
    type,
    difficulty,
    count,
}: {
    type?: string;
    difficulty?: string;
    count: number;
}) => {
    try {
        const match: any = {};
        if (type) match.type = type;
        if (difficulty) match.difficulty = difficulty;

        const data = await Question.aggregate([
            { $match: match },
            { $sample: { size: count } },
        ]);

        return {
            metadata: {
                totalGenerated: data.length,
                filter: { type, difficulty, count },
            },
            data,
        };
    } catch (error) {
        throw new Error("Failed to generate questions");
    }
};

export const ExamQAGeneratorServices = {
    createQuestion,
    getQuestions,
    generateQuestions,
};
