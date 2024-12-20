import Head from 'next/head';
import Header from '@/components/UI/header';
import { Roboto } from 'next/font/google';
import Footer from '@/components/UI/footer';
import RegisterPage from '@/components/register/register';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '100',
});

export default function Register() {
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="Register" content="register a new user" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <RegisterPage />

            <Footer />
        </>
    );
}
