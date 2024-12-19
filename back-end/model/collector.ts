import { User as UserPrisma } from '@prisma/client';
import { Collection as CollectionPrisma } from '@prisma/client';
import { Collector as CollectorPrisma } from '@prisma/client';
import { Car as CarPrisma } from '@prisma/client';
import { Collector as OwnerPrisma } from '@prisma/client';
import { User } from '../model/user';
import { Collection } from '../model/collection';

export class Collector {
    private id?: number;
    private user: User;
    private collections: Collection[];
    private profileDescription: string;

    constructor(collector: {
        id?: number,
        user: User,
        collections: Collection[],
        profileDescription: string
    }) {
        this.validate(collector);
        this.id = collector.id;
        this.user = collector.user;
        this.collections = collector.collections;
        this.profileDescription = collector.profileDescription;
    }

    //getters
    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getCollections(): Collection[] {
        return this.collections;
    }

    getProfileDescription(): string {
        return this.profileDescription;
    }

    //validation
    validate(collector: {
        id?: number,
        user: User,
        collections: Collection[],
        profileDescription: string
    }) {
        if (!collector.user) {
            throw new Error("Collector must be a user");
        }

        if (!collector.profileDescription)  {
            throw new Error("Collector must have a profile description");
        }
        if (collector.user.getRole() !== 'COLLECTOR') {
            throw new Error("User must be a collector");
        }
    }

    equals(collector: Collector): boolean {
        return (
            this.user === collector.getUser() &&
            this.collections === collector.getCollections() &&
            this.profileDescription === collector.getProfileDescription()
        );
    }

    static from({
        id,
        user,
        collections,
        profileDescription,
    }: CollectorPrisma & {
        user: UserPrisma;
        collections: (CollectionPrisma & {
            cars: CarPrisma[];
            owner: OwnerPrisma;
        })[];
    }) {
        return new Collector({
            id,
            user: User.from(user),
            collections: collections.map((collection) => Collection.from(collection)),
            profileDescription,
        });
    }
}