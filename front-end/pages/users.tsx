import Head from 'next/head';
import { Roboto } from 'next/font/google';
import Header from '@/components/UI/header';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import UserService from '@/services/userservice';
import Footer from '@/components/UI/footer';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '100',
});

interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    birthDate: string;
    address: string;
}

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userService = await UserService();
                const users = await userService.fetchUsers();
                setUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUsers();
    }, []);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="Users" content="View all users" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className={styles.container}>
                <main className={`${styles.main} ${roboto.className}`}>
                    <h1 className={styles.header}>Overzicht van alle gebruikers:</h1>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Birth Date</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.birthDate).toLocaleDateString()}</td>
                                    <td>{user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>

            <Footer />
        </>
    );
}
