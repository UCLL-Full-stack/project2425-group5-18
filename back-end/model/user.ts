import { Role } from '../types';
import { User as UserPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private username: string;
    private email: string;
    private password: string;
    private birthDate: Date;
    private address: string;
    private role: Role;

    constructor(user: {
        id?: number,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
        birthDate: Date,
        address: string,
        role: Role
    }) {
        this.validate(user);
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.birthDate = user.birthDate;
        this.address = user.address;
        this.role = user.role;
    }

    //getters
    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getBirthDate(): Date {
        return this.birthDate;
    }

    getAddress(): string {
        return this.address;
    }

    getRole(): Role {
        return this.role;
    }

    validate(user: {
        id?: number,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
        birthDate: Date,
        address: string,
        role: Role
    }): void {
        if (!user.firstName) {
            throw new Error('First name is required');
        }

        if (!user.lastName) {
            throw new Error('Last name is required');
        }

        if (!user.username) {
            throw new Error('Username is required');
        }

        if (!user.email) {
            throw new Error('Email is required');
        }
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!regexp.test(user.email)) {
            throw new Error('Email is not valid');
        }

        if (!user.password) {
            throw new Error('Password is required');
        }

        if (!user.birthDate) {
            throw new Error('Birth date is required');
        }

        if (user.birthDate.getFullYear() > new Date(Date.now()).getFullYear() - 18) {
            throw new Error('User must be at least 18 years old');
        }

        if (!user.address) {
            throw new Error('Address is required');
        }

        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.birthDate === user.getBirthDate() &&
            this.address === user.getAddress() &&
            this.role === user.getRole()
        );
    }

    static from({ id, firstName, lastName, username, email, password, birthDate, address, role }: UserPrisma) {
        return new User({
            id,
            firstName,
            lastName,
            username,
            email,
            password,
            birthDate,
            address,
            role: role as Role,
        });
    }
}