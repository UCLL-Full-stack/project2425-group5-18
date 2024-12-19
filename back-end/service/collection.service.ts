import { Car } from "../model/car";
import { Collection } from "../model/collection";
import collectionDB from "../repository/collection.db";
import { CollectionInput } from "../types";

const getAllCollections = async (): Promise<Collection[]> => collectionDB.getAllCollections();

const getCollectionsByOwnerId = async ({ ownerId }: { ownerId: number }): Promise<Collection[]> => collectionDB.getCollectionsByOwnerId({ ownerId });

const createCollection = async ({
    cars,
    name,
    description,
}: CollectionInput): Promise<Collection> => {
    const carsMapped = cars.map(carInput => new Car(carInput));
    const collection = new Collection({
        cars: carsMapped,
        name,
        description,
    });

    return await collectionDB.createCollection(collection);
}

export default {
    getAllCollections,
    getCollectionsByOwnerId,
    createCollection,
};