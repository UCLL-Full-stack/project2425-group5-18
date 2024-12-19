import { Car } from '../model/car';
import carDB from '../repository/car.db';
import { CarInput } from '../types';

const getAllCars = async (): Promise<Car[]> => carDB.getAllCars();

const getCarById = async ({ id }: { id: number }): Promise<Car | null> => carDB.getCarById({ id });

const getCarByBrand = async ({ brand }: { brand: string }): Promise<Car | null> => carDB.getCarByBrand({ brand });

const getCarByModel = async ({ model }: { model: string }): Promise<Car | null> => carDB.getCarByModel({ model });

const getCarByYear = async ({ year }: { year: number }): Promise<Car | null> => carDB.getCarByYear({ year });

const createCar = async ({
    brand,
    model,
    year,
    fuel,
    transmission,
    distance,
    color,
    picture,
}: CarInput): Promise<Car> => {
    const car = new Car({
        brand,
        model,
        year,
        fuel,
        transmission,
        distance,
        color,
        picture,
    });

    return await carDB.createCar(car);
};

export default {
    getAllCars,
    getCarById,
    getCarByBrand,
    getCarByModel,
    getCarByYear,
    createCar,
};