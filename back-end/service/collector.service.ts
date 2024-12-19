import { Car } from '../model/car';
import { Collection } from '../model/collection';
import { Collector } from '../model/collector';
import { User } from '../model/user';
import collectorDB from '../repository/collector.db';
import { CollectorInput } from '../types';

const getAllCollectors = async (): Promise<Collector[]> => collectorDB.getAllCollectors();

const getCollectorById = async ({ id }: { id: number }): Promise<Collector | null> => collectorDB.getCollectorById({ id });

const createCollector = async ({
    user,
    collections,
    profileDescription,
}: CollectorInput): Promise<Collector> => {
    const userMapped = new User(user);
    const collectionsMapped = collections.map(collection => {
        const carsMapped = collection.cars.map(car => new Car(car));
        return new Collection({ ...collection, cars: carsMapped });
    });
    const collector = new Collector({
        user: userMapped,
        collections: collectionsMapped,
        profileDescription,
    });

    return await collectorDB.createCollector(collector);
};

export default {
    getAllCollectors,
    getCollectorById,
    createCollector,
};