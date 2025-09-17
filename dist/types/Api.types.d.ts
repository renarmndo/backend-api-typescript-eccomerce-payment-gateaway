export interface ApiResponse<T = any> {
    success: boolean;
    msg: string;
    data?: string;
}
export interface RegisterResponse {
    id: string;
    name: string;
    email: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface RequestRegister {
    name: string;
    email: string;
    password: string;
}
export interface RequestLogin {
    email: string;
    password: string;
}
export interface ResponseLoginWithToken {
    token: string;
    email: string;
    password: string;
}
export type ResponseLogin = Omit<ResponseLoginWithToken, "password">;
//# sourceMappingURL=Api.types.d.ts.map