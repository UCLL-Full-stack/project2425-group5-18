export type User = {
    id?: number,
    firstName?: string,
    lastName?: string,
    username?: string,
    email?: string,
    password?: string,
    birthDate?: Date,
    address?: string,
    role?: string
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};