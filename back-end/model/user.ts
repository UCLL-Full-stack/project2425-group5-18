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
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.birthDate = user.birthDate;
        this.address = user.address;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getBirthDate(): Date {
        return this.birthDate;
    }

    public getAddress(): string {
        return this.address;
    }

    public setId(id: number): void {
        this.id = id;
    }

    private isValidPassword(): boolean {
        return this.password.length >= 7;
    }

    private isValidUsername(existingUsernames: string[]): boolean {
        return !existingUsernames.includes(this.username);
    }

    private isValidEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    private isValidAge(): boolean {
        const today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear();
        const monthDiff = today.getMonth() - this.birthDate.getMonth();
        const dayDiff = today.getDate() - this.birthDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age >= 16 && age <= 110;
    }

    public registerUser(existingUsernames: string[]): string {
        if (!this.isValidPassword()) {
            return "Password must be at least 7 characters long.";
        }
        if (!this.isValidUsername(existingUsernames)) {
            return "Username must be unique.";
        }
        if (!this.isValidEmail()) {
            return "Email must be of valid format.";
        }
        if (!this.isValidAge()) {
            return "Age must be between 16 and 110.";
        }
        return "User registered successfully.";
    }
}