import React, { useEffect, useState } from 'react';
import CarService from '../../services/carservice';

const CarTable: React.FC = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carService = CarService();
                const cars = await carService.getAllCars();
                if (Array.isArray(cars)) {
                    setCars(cars);
                } else {
                    setError('Failed to fetch cars');
                }
            } catch (err) {
                console.error(err);
                setError('Unauthorized access');
            }
        };

        fetchCars();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Fuel</th>
                    <th>Transmission</th>
                    <th>Distance</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(cars) &&
                    cars.map((car: any) => (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.color}</td>
                            <td>{car.year}</td>
                            <td>{car.fuel}</td>
                            <td>{car.transmission}</td>
                            <td>{car.distance}</td>
                            <td>
                                <img
                                    src={car.picture}
                                    alt={`${car.brand} ${car.model}`}
                                    width="100"
                                />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

const Cars: React.FC = () => {
    return (
        <main>
            <h1>Welkom in de kluis</h1>
            <CarTable />
        </main>
    );
};

export default Cars;
