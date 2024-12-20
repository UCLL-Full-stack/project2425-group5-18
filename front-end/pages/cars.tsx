import Head from 'next/head';
import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';
import CarsPage from '@/components/Cars/cars';

export default function Cars() {
    return (
        <>
            <Head>
                <title>Cars</title>
                <meta name="Cars" content="Overview of cars in our app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <CarsPage />

            <Footer />
        </>
    );
}
