import Head from 'next/head';
import { Roboto } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from '@/styles/Home.module.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '100',
});

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="Homepage" content="Overview of functionality in our app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className={styles.container}>
                <main className={`${styles.main} ${roboto.className}`}>
                    <h1 className={styles.header}>Welkom op onze site Car Vault</h1>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            Ga naar de{' '}
                            <a href="/" className={styles.link}>
                                home
                            </a>{' '}
                            pagina om terug te keren naar deze pagina
                        </li>
                        <li className={styles.listItem}>
                            Ga naar de{' '}
                            <a href="/register" className={styles.link}>
                                register
                            </a>{' '}
                            pagina om een user/account aan te maken.
                        </li>
                        <li className={styles.listItem}>
                            Ga naar de{' '}
                            <a href="/users" className={styles.link}>
                                users
                            </a>{' '}
                            pagina om alle users te zien.
                        </li>
                    </ul>

                    <div>
                        <h2>Overzicht gebruikers</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Admin</td>
                                    <td>SecurePassword</td>
                                    <td>ADMIN</td>
                                </tr>
                                <tr>
                                    <td>KolleHector</td>
                                    <td>password2</td>
                                    <td>COLLECTOR</td>
                                </tr>
                                <tr>
                                    <td>ViezeThor</td>
                                    <td>password3</td>
                                    <td>VISITOR</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    );
}
