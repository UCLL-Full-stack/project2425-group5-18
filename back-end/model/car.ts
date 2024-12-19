import { Fuel, Transmission } from '../types';
import { Car as CarPrisma} from '@prisma/client';

export class Car {
    private id? : number;
    private brand: string;
    private model: string;
    private color:  string;
    private year: number;
    private fuel: Fuel;
    private transmission: Transmission;
    private distance: number;
    private picture: URL;

    constructor(car: {
        id?: number,
        brand: string,
        model: string,
        color: string,
        year: number,
        fuel: Fuel,
        transmission: Transmission,
        distance: number,
        picture: URL
    }) {
        this.validate(car);
        this.id = car.id;
        this.brand = car.brand;
        this.model = car.model;
        this.color = car.color;
        this.year = car.year;
        this.fuel = car.fuel;
        this.transmission = car.transmission;
        this.distance = car.distance;
        this.picture = car.picture;
    }

    //getters
    getId(): number | undefined {
        return this.id;
    }

    getBrand(): string {
        return this.brand;
    }

    getModel(): string {
        return this.model;
    }

    getColor(): string {
        return this.color;
    }

    getYear(): number {
        return this.year;
    }

    getFuel(): Fuel {
        return this.fuel;
    }

    getTransmission(): Transmission {
        return this.transmission;
    }

    getDistance(): number {
        return this.distance;
    }

    getPicture(): URL {
        return this.picture;
    }

    validate(car: {
        id?: number,
        brand: string,
        model: string,
        color: string,
        year: number,
        fuel: Fuel,
        transmission: Transmission,
        distance: number,
        picture: URL
    }): void {
        //required
        if (!car.brand) {
            throw new Error('Brand is required');
        }

        if (!car.model) {
            throw new Error('Model is required');
        }

        if (!car.color) {
            throw new Error('Color is required');
        }

        if (!car.year) {
            throw new Error('Year is required');
        }

        if (!car.fuel) {
            throw new Error('Fuel is required');
        }

        if (!car.transmission) {
            throw new Error('Transmission is required');
        }

        if (!car.distance) {
            throw new Error('Distance is required');
        }

        if (!car.picture) {
            throw new Error('Picture is required');
        }

        //special
        if (car.year < 1900 || car.year > new Date().getFullYear()) {
            throw new Error('Year is invalid');
        }

        if (car.distance < 0) {
            throw new Error('Distance is invalid');
        }
    }

    equals(car: Car): boolean {
        return (
            this.brand === car.getBrand() &&
            this.model === car.getModel() &&
            this.color === car.getColor() &&
            this.year === car.getYear() &&
            this.fuel === car.getFuel() &&
            this.transmission === car.getTransmission() &&
            this.distance === car.getDistance() &&
            this.picture === car.getPicture()
        );
    }

    static from({ id, brand, model, color, year, fuel, transmission, distance, picture }: CarPrisma) {
        return new Car({
            id,
            brand,
            model,
            color,
            year,
            fuel,
            transmission,
            distance,
            picture: new URL(picture)
        })
    }
}