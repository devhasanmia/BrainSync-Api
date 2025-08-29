import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"
import { ClassScheduleRoutes } from "../modules/classSchedule/classSchedule.route"

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
    }
]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


