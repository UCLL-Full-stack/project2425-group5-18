import { User } from '../model/user';

const user1 = new User({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@web.com',
    password: 'password',
    birthDate: new Date('1990-01-01'),
    address: 'Sesamstraat 20, 3000 Leuven'
});

const user2 = new User({
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    email: 'janedoe@web.com',
    password: 'password',
    birthDate: new Date('1990-01-01'),
    address: 'Sesamstraat 21, 3000 Leuven'
});

const users = [user1, user2];

export function getUsers(): User[] {
    return users;
}

export function getUserById(id: number): User | undefined {
    return users.find(user => user.getId() === id);
}

export function addUser(user: User): User {
    users.push(user);
    return user;
}

export default {
    getUsers,
    getUserById,
    addUser
};