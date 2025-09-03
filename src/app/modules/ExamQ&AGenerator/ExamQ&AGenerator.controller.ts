import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatus } from "../../utils/httpStatus";
import { ExamQAGeneratorServices, QuizSettings } from "./ExamQ&AGenerator.service";

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
    const { questionType, difficulty, numberOfQuestions } = req.body as QuizSettings;
    const data = await ExamQAGeneratorServices.generateQuestions({
        questionType,
        difficulty,
        numberOfQuestions,
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
