import { UserInterface } from "./user";

export interface ResetPasswordInferface {
    user: UserInterface;
    token: string;
    expired_at?: string;
}