import { Roboto } from 'next/font/google';
import styles from '@/styles/register.module.css';
import { useState } from 'react';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '100',
});

interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    birthDate: string;
    address: string;
}

const register: React.FC = () => {
    const initialUserState: User = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        birthDate: '',
        address: '',
    };

    const [user, setUser] = useState<User>(initialUserState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            alert('User registered successfully');
            setUser(initialUserState);
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
    };

    const handleCancel = () => {
        setUser(initialUserState);
    };

    return (
        <div className={`${styles.container} ${roboto.className}`}>
            <h1 className={styles.header}>Registreer hier een gebruiker</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="birthDate">Birth Date</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={user.birthDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={styles.button}>
                        Register
                    </button>
                    <button type="button" className={styles.button} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default register;
