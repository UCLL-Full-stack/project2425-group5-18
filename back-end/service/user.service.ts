import userDb from "../repository/user.db";
import { User } from "../model/user";

const getAllUsers = (): User[] => userDb.getUsers();

const getUserById = (id: number): User | undefined => userDb.getUserById(id);

const getAllUsernames = (): string[] => {
    const users = getAllUsers();
    return users.map(user => user.getUsername());
};

const createUser = (user: User): User => {
    return userDb.addUser(user);
};

export default {
    getAllUsers,
    getUserById,
    getAllUsernames,
    createUser
};