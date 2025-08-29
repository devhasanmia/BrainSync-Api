import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import { createUserToken, refreshAccessToken } from "../../utils/userToken";
import { HttpStatus } from "../../utils/httpStatus";

const register = async (payload: IUser) => {
    try {
        const isExist = await User.findOne({ email: payload.email });
        if (isExist) {
            throw new AppError(409, "User already exists with this phone number");
        }
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const createdUser = await User.create([{
            ...payload,
            password: hashedPassword,
        }]);
        const { password, ...userWithoutPassword } = createdUser[0].toObject();
        return userWithoutPassword;
    } catch (error) {
        throw error;
    }
};


const login = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(
            HttpStatus.NOT_FOUND,
            "Incorrect password or phone number"
        );
    }
    const isPasswordValid = await bcrypt.compare(password as string, user.password);
    if (!isPasswordValid) {
        throw new AppError(HttpStatus.UNAUTHORIZED, "Incorrect password or phone number");
    }
    const userToken = createUserToken(user as any);
    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: {
            name: user.name,
            email: user.email
        },
    };
};

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await refreshAccessToken(refreshToken)
    return {
        accessToken: newAccessToken,
    };
};


export const AuthServices = {
    register,
    login,
    getNewAccessToken
}
