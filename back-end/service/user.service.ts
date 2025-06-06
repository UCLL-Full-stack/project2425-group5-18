import bcrypt from 'bcrypt';
import userDB from "../repository/user.db";
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import { User } from "../model/user";

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    };
};

const createUser = async ({
    firstName,
    lastName,
    username,
    email,
    password,
    birthDate,
    address,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username });
    if (existingUser) {
        throw new Error(`User with username: ${username} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        birthDate,
        address,
        role,
    });

    return await userDB.createUser(user);
};


export default {
    getUserByUsername,
    authenticate,
    createUser,
    getAllUsers };