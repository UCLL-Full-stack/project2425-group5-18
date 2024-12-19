import { Collection } from "../model/collection";
import database from "./database";

const getAllCollections = async (): Promise<Collection[]> => {
    try {
        const collectionsPrisma = await database.collection.findMany({
            include: {
                cars: true,
                owner: true,
            },
        });
        return collectionsPrisma.map((collectionPrisma) => Collection.from(collectionPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCollectionsByOwnerId = async ({ ownerId }: { ownerId: number }): Promise<Collection[]> => {
    try {
        const collectionsPrisma = await database.collection.findMany({
            where: { ownerId },
            include: {
                cars: true,
                owner: true,
            },
        });
        return collectionsPrisma.map((collectionPrisma) => Collection.from(collectionPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createCollection = async (collection: Collection): Promise<Collection> => {
    try {
        const collectionPrisma = await database.collection.create({
            data: {
                name: collection.getName(),
                description: collection.getDescription(),
                owner: {
                    connect: { id: collection.ownerId }
                },
                cars: {
                    connect: collection.getCars().map(car => ({ id: car.getId() }))
                }
            },
            include: {
                cars: true,
                owner: true,
            },
        });

        return Collection.from(collectionPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllCollections,
    getCollectionsByOwnerId,
    createCollection,
};