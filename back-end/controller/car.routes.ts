import express, { NextFunction, Request, Response } from 'express';
import carService from '../service/car.service';
import { CarInput } from '../types';

const carRouter = express.Router();

carRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});

carRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarById({ id: Number(req.params.id) });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

carRouter.get('/brand/:brand', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarByBrand({ brand: String(req.params.brand) });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

carRouter.get('/model/:model', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarByModel({ model: String(req.params.model) });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

carRouter.get('/year/:year', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarByYear({ year: Number(req.params.year) });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

carRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carInput = <CarInput>req.body;
        const car = await carService.createCar(carInput);
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

export { carRouter };