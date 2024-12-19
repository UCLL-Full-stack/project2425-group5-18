import express, { NextFunction, Request, Response } from 'express';
import collectionService from '../service/collection.service';
import { CollectionInput } from '../types';

const collectionRouter = express.Router();

collectionRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collections = await collectionService.getAllCollections();
        res.status(200).json(collections);
    } catch (error) {
        next(error);
    }
});

collectionRouter.get('/:ownerId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collections = await collectionService.getCollectionsByOwnerId({ ownerId: Number(req.params.ownerId) });
        res.status(200).json(collections);
    } catch (error) {
        next(error);
    }
});

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