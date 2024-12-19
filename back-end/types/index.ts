type Role = 'ADMIN' | 'COLLECTOR' | 'VISITOR';
type Fuel = 'DIESEL' | 'BENZINE' | 'ELEKTRISCH' | 'HYBRIDE' | 'LPG';
type Transmission = 'MANUEEL' | 'AUTOMAAT';

type UserInput = {
        id?: number,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        password: string,
        birthDate: Date,
        address: string,
        role: Role
}

type CollectorInput = {
        id?: number,
        user: UserInput,
        collections: CollectionInput[],
        profileDescription: string
}

type CarInput = {
        id?: number,
        brand: string,
        model: string,
        color: string,
        year: number,
        fuel: Fuel,
        transmission: Transmission,
        distance: number,
        picture: URL
}

type CollectionInput = {
        id?: number,
        cars: CarInput[],
        name: string,
        description: string,
        owner: CollectorInput
}

type AuthenticationResponse = {
        token: string;
        username: string;
        fullname: string;
        role: string;
}

export {
        Role,
        Fuel,
        Transmission,
        UserInput,
        CollectorInput,
        CarInput,
        CollectionInput,
        AuthenticationResponse
};