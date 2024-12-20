/**
 * @swagger
 * components:
 *   schemas:
 *     Collection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: databank id.
 *         cars:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Car'
 *           description: een lijst van autos in de collectie.
 *         name:
 *           type: string
 *           description: collectie naam.
 *         description:
 *           type: string
 *           description: een beschrijving van de collectie.
 */

import express, { NextFunction, Request, Response } from 'express';
import collectionService from '../service/collection.service';
import { CollectionInput } from '../types';

const collectionRouter = express.Router();
/**
 * @swagger
 * /collections:
 *   get:
 *     summary: get request van alle collecties.
 *     responses:
 *       200:
 *         description: een lijst van alle collectie.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 */
collectionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collections = await collectionService.getAllCollections();
        res.status(200).json(collections);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /collections/{ownerId}:
 *   get:
 *     summary: een lijst van alle collecties met het id vd user als pathvariable.
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: id vd user.
 *     responses:
 *       200:
 *         description: een lijst van collecties.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 *       404:
 *         description: deze gberuikeer heeft geen colleties.
 */
collectionRouter.get('/:ownerId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collections = await collectionService.getCollectionsByOwnerId({ ownerId: Number(req.params.ownerId) });
        res.status(200).json(collections);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /collections:
 *   post:
 *     summary: creer een nieuwe collectie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CollectionInput'
 *     responses:
 *       201:
 *         description: collectie succesvol aangemaakt.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       400:
 *         description: mislukt.
 */
collectionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collectionInput = <CollectionInput>req.body;
        const collection = await collectionService.createCollection(collectionInput);
        res.status(201).json(collection);
    } catch (error) {
        next(error);
    }
});

export {collectionRouter};