/**
 * @swagger
 * components:
 *   schemas:
 *     Collector:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: databankvolgnummer.
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: de gebruiker die aan de collertor is gelinkt.
 *         collections:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Collection'
 *           description: de collecties die tot de verzamelaar behoren.
 *         profileDescription:
 *           type: string
 *           description: profielbeschrijving van collector.
 */
import express, { NextFunction, Request, Response } from 'express';
import collectorService from '../service/collector.service';
import { CollectorInput } from '../types';

const collectorRouter = express.Router();

/**
 * @swagger
 * /collectors:
 *   get:
 *     summary: get request van alle verzamelaars (collectors).
 *     responses:
 *       200:
 *         description: een lijst van verzamelaars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collector'
 */

collectorRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collectors = await collectorService.getAllCollectors();
        res.status(200).json(collectors);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /collectors/{id}:
 *   get:
 *     summary: get request van de collectors met userid als pathvariable.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the collector to retrieve.
 *     responses:
 *       200:
 *         description: hier is de gevraagde verzamelaar.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collector'
 *       404:
 *         description: verzameaar bestaat niet.
 */

collectorRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collector = await collectorService.getCollectorById({ id: Number(req.params.id) });
        res.status(200).json(collector);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /collectors:
 *   post:
 *     summary: Create a new collector.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CollectorInput'
 *     responses:
 *       201:
 *         description: Collector created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collector'
 *       400:
 *         description: Bad request.
 */

collectorRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collectorInput = <CollectorInput>req.body;
        const collector = await collectorService.createCollector(collectorInput);
        res.status(201).json(collector);
    } catch (error) {
        next(error);
    }
});

export {collectorRouter};