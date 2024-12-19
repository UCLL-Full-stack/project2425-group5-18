import { Collector } from '../model/collector';
import database from './database';

const getAllCollectors = async (): Promise<Collector[]> => {
    try {
        const collectorsPrisma = await database.collector.findMany({
            include: {
                user: true,
                collections: {
                    include: {
                        cars: true,
                        owner: true,
                    },
                },
            },
        });
        return collectorsPrisma.map((collectorPrisma) => Collector.from(collectorPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCollectorById = async ({ id }: { id: number }): Promise<Collector | null> => {
    try {
        const collectorPrisma = await database.collector.findUnique({
            where: { id },
            include: {
                user: true,
                collections: {
                    include: {
                        cars: true,
                        owner: true,
                    },
                },
            },
        });

        return collectorPrisma ? Collector.from(collectorPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createCollector = async (collector: Collector): Promise<Collector> => {
    try {
        const collectorPrisma = await database.collector.create({
            data: {
                user: {
                    connect: { id: collector.getUser().getId() }
                },
                collections: {
                    connect: collector.getCollections().map(collection => ({ id: collection.getId() }))
                },
                profileDescription: collector.getProfileDescription()
            },
            include: {
                user: true,
                collections: {
                    include: {
                        cars: true,
                        owner: true,
                    },
                },
            },
        });

        return Collector.from(collectorPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllCollectors,
    getCollectorById,
    createCollector,
};