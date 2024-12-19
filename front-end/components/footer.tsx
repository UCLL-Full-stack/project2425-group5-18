import React from 'react';
import { Roboto } from 'next/font/google';
import styles from '@/styles/footer.module.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '500',
});

const Footer: React.FC = () => {
    return (
        <footer className={`${styles.footer} ${roboto.className}`}>
            <p>© 2021 Car Vault | made by Thomas Debacker & Hendrik De Coninck</p>
        </footer>
    );
};

export default Footer;
