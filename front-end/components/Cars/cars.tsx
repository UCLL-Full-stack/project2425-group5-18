import { Roboto } from 'next/font/google';
// import styles from '@/styles/Cars.module.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '100',
});

const Cars: React.FC = () => {
    return (
        <main>
            <h1>Welkom in de kluis</h1>
        </main>
    );
};

export default Cars;
