import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatus } from "../../utils/httpStatus";
import { ExamQAGeneratorServices } from "./ExamQ&AGenerator.service";

// ---- Create Question ----
const createQuestion = catchAsync(async (req, res) => {
    const data = await ExamQAGeneratorServices.createQuestion(req.body);
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "Question created successfully",
        data,
    });
});

// ---- Get all Questions ----
const getQuestions = catchAsync(async (req, res) => {
    const data = await ExamQAGeneratorServices.getQuestions();

    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Questions retrieved successfully",
        data,
    });
});

// ---- Generate Random Questions ----
const generateQuestions = catchAsync(async (req, res) => {
    const { type, difficulty, count } = req.query;
    const data = await ExamQAGeneratorServices.generateQuestions({
        type: type as string,
        difficulty: difficulty as string,
        count: count ? Number(count) : 5,
    });
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Questions generated successfully",
        data,
    });
});

export const ExamQAGeneratorController = {
    createQuestion,
    getQuestions,
    generateQuestions,
};
