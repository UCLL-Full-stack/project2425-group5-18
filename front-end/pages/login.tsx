import Head from 'next/head';
import { Roboto } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
// import styles from '@/styles/Login.module.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '100',
});

export default function Cars() {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="Cars" content="Login Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main>
                <h1>Welkom in de kluis</h1>
                <ul></ul>
            </main>
            <Footer />
        </>
    );
}
