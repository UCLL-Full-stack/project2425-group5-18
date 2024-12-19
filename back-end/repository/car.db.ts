import { Car } from '../model/car';
import database from './database';

const getAllCars = async (): Promise<Car[]> => {
    try {
        const carsPrisma = await database.car.findMany();
        return carsPrisma.map((carPrisma) => Car.from(carPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCarById = async ({ id }: { id: number }): Promise<Car | null> => {
    try {
        const carPrisma = await database.car.findUnique({
            where: { id },
        });

        return carPrisma ? Car.from(carPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCarByBrand = async ({ brand }: { brand: string }): Promise<Car | null> => {
    try {
        const carPrisma = await database.car.findFirst({
            where: { brand },
        });

        return carPrisma ? Car.from(carPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getCarByModel = async ({ model }: { model: string }): Promise<Car | null> => {
    try {
        const carPrisma = await database.car.findFirst({
            where: { model },
        });

        return carPrisma ? Car.from(carPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getCarByYear = async ({ year }: { year: number }): Promise<Car | null> => {
    try {
        const carPrisma = await database.car.findFirst({
            where: { year },
        });

        return carPrisma ? Car.from(carPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createCar = async (car: Car): Promise<Car> => {
    try {
        const carPrisma = await database.car.create({
            data: {
                brand: car.getBrand(),
                model: car.getModel(),
                color: car.getColor(),
                year: car.getYear(),
                fuel: car.getFuel(),
                transmission: car.getTransmission(),
                distance: car.getDistance(),
                picture: car.getPicture().toString(),
            },
        });
        return Car.from(carPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllCars,
    getCarById,
    getCarByBrand,
    getCarByModel,
    getCarByYear,
    createCar,
};
