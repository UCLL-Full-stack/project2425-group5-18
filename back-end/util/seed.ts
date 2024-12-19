// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

    const main = async () => {
        await prisma.collection.deleteMany();
        await prisma.collector.deleteMany();
        await prisma.car.deleteMany();
        await prisma.user.deleteMany();

        //users
        const admin1 = await prisma.user.create({
            data: {
                firstName: 'Admin',
                lastName: 'Admin',
                username: 'admin',
                email: 'admin@web.com',
                password: await bcrypt.hash('SecurePassword', 10),
                birthDate: new Date(1980, 3, 20),
                address: 'Sesamstraat 42, 3000 Leuven',
                role: 'ADMIN'
            }
        })

        const user1 = await prisma.user.create({
            data: {
                firstName: 'Colle',
                lastName: 'Ktor',
                username: 'ColleKtor',
                email: 'ColleKtor@web.com',
                password: await bcrypt.hash('password1', 10),
                birthDate: new Date(1990, 3, 20),
                address: 'Sesamstraat 43, 3000 Leuven',
                role: 'COLLECTOR'
            }
        })

        const user2 = await prisma.user.create({
            data: {
                firstName: 'Hector',
                lastName: 'Kolle',
                username: 'KolleHector',
                email: 'KolleHector@web.com',
                password: await bcrypt.hash('password2', 10),
                birthDate: new Date(1990, 3, 20),
                address: 'Sesamstraat 44, 3000 Leuven',
                role: 'COLLECTOR'
            }
        })

        const user3 = await prisma.user.create({
            data: {
                firstName: 'Thor',
                lastName: 'Vieze',
                username: 'ViezeThor',
                email: 'ViezeThor@web.com',
                password: await bcrypt.hash('password3', 10),
                birthDate: new Date(1990, 3, 20),
                address: 'Sesamstraat 45, 3000 Leuven',
                role: 'VISITOR'
            }
        })


        //cars
        const ford = await prisma.car.create({
            data: {
                brand: 'Ford',
                model: '911',
                color: 'red',
                year: 2010,
                fuel: 'BENZINE',
                transmission: 'MANUEEL',
                distance: 10000,
                picture: 'Ford911.png'
            }
        })

        const fiat = await prisma.car.create({
            data: {
                brand : 'Fiat',
                model : '500',
                color : 'yellow',
                year : 2020,
                fuel : 'ELEKTRISCH',
                transmission : 'AUTOMAAT',
                distance : 50000,
                picture: "Fiat500.png"
            }
        })

        const Lada = await prisma.car.create({
            data: {
                brand : 'Lada',
                model : 'Riva',
                color : 'Blue',
                year : 1980,
                fuel : 'DIESEL',
                transmission : 'MANUEEL',
                distance : 10000000,
                picture: "Lada.png"
            }
        })

        const Saab = await prisma.car.create({
            data: {
                brand : 'Saab',
                model : '900',
                color : 'Grey',
                year : 2008,
                fuel : 'DIESEL',
                transmission : 'MANUEEL',
                distance : 10023,
                picture: "Saab900.png"
            }
        })

        const Mazda = await prisma.car.create({
            data: {
                brand : 'Mazda',
                model : 'MX5',
                color : 'Template',
                year : 2021,
                fuel : 'BENZINE',
                transmission : 'MANUEEL',
                distance : 4989387,
                picture: "MazdaMX5.png"
            }
        })
        const Toyota = await prisma.car.create({
            data: {
                brand : 'Toyota',
                model : 'CHR',
                color : 'Template',
                year : 2021,
                fuel : 'DIESEL',
                transmission : 'MANUEEL',
                distance : 509309,
                picture: "ToyotaCHR.png"
            }
        })

        const Audi = await prisma.car.create({
            data: {
                brand : 'Audi',
                model : 'RS6',
                color : 'Green',
                year : 2010,
                fuel : 'BENZINE',
                transmission : 'MANUEEL',
                distance : 345723,
                picture: "AudiRS6.png"
            }
        })

        //collectors
        const collector1 = await prisma.collector.create({
            data : {
                user: {
                    connect: { id: user1.id }
                },
                profileDescription: 'I like cars'
            }
        })

        const collector2 = await prisma.collector.create({
            data : {
                user: {
                    connect: { id: user2.id }
                },
                profileDescription: 'I like cars too (I don\'t know what to write)'
            }
        })

        //collections
        const Collection1 = await prisma.collection.create({
            data: {
                name: 'Oldtimers',
                description: 'A collection of old cars',
                owner: {
                    connect: { id: collector1.id }
                },
                cars: {
                    connect: [{ id: ford.id }, { id: Lada.id }]
                }
            }
        })

        const Collection2 = await prisma.collection.create({
            data: {
                name: 'New cars',
                description: 'A collection of new cars',
                owner: {
                    connect: { id: collector2.id }
                },
                cars: {
                    connect: [{ id: Mazda.id }, { id: Toyota.id }]
                }
            }
        })

        const Collection3 = await prisma.collection.create({
            data: {
                name: 'Sport cars',
                description: 'A collection of sport cars',
                owner: {
                    connect: { id: collector1.id }
                },
                cars: {
                    connect: [{ id: Audi.id }, { id: Saab.id }]
                }
            }
        })

        console.log('Seeding successful');
    };


    (async () => {
        try {
            await main();
            await prisma.$disconnect();
        } catch (error) {
            console.error(error);
            await prisma.$disconnect();
            process.exit(1);
        }
    })();

