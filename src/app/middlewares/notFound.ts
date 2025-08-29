import { Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatus";



const notFound = (req: Request, res: Response) => {
    res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Route Not Found"
    })
}

export default notFound