import React from 'react';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import styles from '@/styles/Header.module.css';

const roboto = Roboto({
    subsets: ['latin'],
    weight: '500',
});

const Header: React.FC = () => {
    return (
        <header className={`${styles.header} ${roboto.className}`}>
            <h1>
                <Image src="/gear.png" alt="Gear Icon" width={50} height={50} />
                Car Vault
                <Image
                    src="/gear.png"
                    alt="Gear Icon"
                    width={50}
                    height={50}
                    style={{ transform: 'scaleX(-1)' }}
                />
            </h1>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                    <li>
                        <a href="/users">Users</a>
                    </li>
                    <li>
                        <a href="/cars">Cars</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
