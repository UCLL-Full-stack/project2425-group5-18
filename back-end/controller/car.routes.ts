/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for a car.
 *         brand:
 *           type: string
 *           description: The brand of the car.
 *         model:
 *           type: string
 *           description: The model of the car.
 *         color:
 *           type: string
 *           description: The color of the car.
 *         year:
 *           type: integer
 *           description: The manufacturing year of the car.
 *         fuel:
 *           type: string
 *           description: The type of fuel the car uses (e.g., petrol, diesel).
 *         transmission:
 *           type: string
 *           description: The transmission type of the car (e.g., automatic, manual).
 *         distance:
 *           type: number
 *           description: The distance the car has traveled in kilometers.
 *         picture:
 *           type: string
 *           format: url
 *           description: A URL to an image of the car.
 */


import express, { NextFunction, Request, Response } from 'express';
import carService from '../service/car.service';
import { CarInput } from '../types';

const carRouter = express.Router();
/**
 * @swagger
 * /car:
 *   get:
 *     summary: Get a list of all cars.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of cars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
carRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /car/{id}:
 *   get:
 *     summary: Get a car by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The car ID.
 *     responses:
 *       200:
 *         description: A car object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found.
 */
carRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarById({ id: Number(req.params.id) });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /car/brand/{brand}:
 *   get:
 *     summary: Get a car by brand.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brand
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand of the car.
 *     responses:
 *       200:
 *         description: A car object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found.
 */
carRouter.get('/brand/:brand', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarByBrand({ brand: String(req.params.brand) });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /car/model/{model}:
 *   get:
 *     summary: Get a car by model.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: model
 *         schema:
 *           type: string
 *         required: true
 *         description: The model of the car.
 *     responses:
 *       200:
 *         description: A car object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found.
 */
carRouter.get('/model/:model', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarByModel({ model: String(req.params.model) });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /car/year/{year}:
 *   get:
 *     summary: Get a car by manufacturing year.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: The manufacturing year of the car.
 *     responses:
 *       200:
 *         description: A car object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found.
 */
carRouter.get('/year/:year', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await carService.getCarByYear({ year: Number(req.params.year) });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /car:
 *   post:
 *     summary: Create a new car.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Bad request.
 */
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