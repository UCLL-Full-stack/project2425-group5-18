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
 *           description: databank id.
 *         brand:
 *           type: string
 *           description: de merknaam (vb Saab).
 *         model:
 *           type: string
 *           description: het model (vb 9000).
 *         color:
 *           type: string
 *           description: de kleur van het voertuig.
 *         year:
 *           type: integer
 *           description: het bouwjaar (!= modeljaar!).
 *         fuel:
 *           type: string
 *           description: de energiebron (vb diesel, benzine, lpg,...).
 *         transmission:
 *           type: string
 *           description: het type versnellingsbak (vb automatisch let op Saab Sensonic kan in deze applicatie niet).
 *         distance:
 *           type: number
 *           description: de kilomerterstand.
 *         picture:
 *           type: string
 *           format: url
 *           description: een url naar de afbeelding.
 */


import express, { NextFunction, Request, Response } from 'express';
import carService from '../service/car.service';
import { CarInput } from '../types';

const carRouter = express.Router();
/**
 * @swagger
 * /car:
 *   get:
 *     summary: get request van alle autos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: een lijst van alle autos.
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
 *     summary: get request van een auto per id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: auto id.
 *     responses:
 *       200:
 *         description: een auto object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: auto niet gevonden.
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
 *     summary: get request met het merk als pathvariable .
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brand
 *         schema:
 *           type: string
 *         required: true
 *         description: de merknaam.
 *     responses:
 *       200:
 *         description: een auto object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: voertuig niet gevonden.
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
 *     summary: get request van autos per model.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: model
 *         schema:
 *           type: string
 *         required: true
 *         description: het model.
 *     responses:
 *       200:
 *         description: A car object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: voertuig niet gevonden.
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
 *     summary: get request per bouwjaar.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: het bouwjaaar vh voertuig.
 *     responses:
 *       200:
 *         description: auto object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: auto niet gevonden.
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
 *     summary: maak een nieuwe auto aan.
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
 *         description: auto succesvol aangemaakt.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: het aanmaken is niet gelukt.
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