import Head from 'next/head';

import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';
import HomePage from '@/components/Home/home';

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

            <HomePage />

            <Footer />
        </>
    );
}
