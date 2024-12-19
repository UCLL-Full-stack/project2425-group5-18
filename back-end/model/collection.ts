import type { Car as CarPrisma } from '@prisma/client';
import type { Collector as OwnerPrisma } from '@prisma/client';
import { Car } from '../model/car';
import type { Collection as CollectionPrisma } from '@prisma/client';

export class Collection {
    private id? : number;
    private cars: Car[];
    private name: string;
    private description: string;
    ownerId: any;

    constructor(collection: {
        id?: number,
        cars: Car[],
        name: string,
        description: string,
    }) {
        this.validate(collection);
        this.id = collection.id;
        this.cars = collection.cars;
        this.name = collection.name;
        this.description = collection.description;
    }

    //getters
    getId(): number | undefined {
        return this.id;
    }

    getCars(): Car[] {
        return this.cars;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    validate(collection: {
        id?: number,
        cars: Car[],
        name: string,
        description: string,
    }) {
        if (!collection.name) {
            throw new Error("Collection must have a name");
        }
        if (!collection.description) {
            throw new Error("Collection must have a description");
        }
    }

    equals(collection: Collection): boolean {
        return (
            this.cars === collection.getCars() &&
            this.name === collection.getName() &&
            this.description === collection.getDescription()
        );
    }

    static from({
        id,
        cars,
        name,
        description,
        owner
    }: CollectionPrisma & {
        cars: CarPrisma[];
        owner: OwnerPrisma;
    }) {
        return new Collection({
            id,
            cars: cars.map((car) => Car.from(car)),
            name,
            description,
        });
    }
}