import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"
import { ClassScheduleRoutes } from "../modules/classSchedule/classSchedule.route"
import { BudgetTrackerRoutes } from "../modules/budgetTracker/budgetTracker.route"
import { StudyPlannerRoutes } from "../modules/studyPlanner/studyPlanner.route"
import { ExamQAGeneratorRoutes } from "../modules/ExamQ&AGenerator/ExamQ&AGenerator.route"
import { StudySessionRoutes } from "../modules/studyAssistant/studyAssistant.route"

export const router = Router()

const apiRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/class-schedule",
        route: ClassScheduleRoutes
    },
    {
        path: "/budget-tracker",
        route: BudgetTrackerRoutes
    },
    {
        path: "/exam-generator",
        route: ExamQAGeneratorRoutes
    },
    {
        path: "/study-planner",
        route: StudyPlannerRoutes
    },
    {
        path: "/study-session",
        route: StudySessionRoutes
    }
]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


