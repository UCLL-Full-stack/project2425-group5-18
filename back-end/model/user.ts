export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private username: string;
    private email: string;
    private password: string;
    private birthDate: Date;
    private address: string;

    constructor(user: {
        id?: number,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
        birthDate: Date,
        address: string
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
    }

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

    validate(user: {
        id?: number,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
        birthDate: Date,
        address: string
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

        if (!user.address) {
            throw new Error('Address is required');
        }
    }
}