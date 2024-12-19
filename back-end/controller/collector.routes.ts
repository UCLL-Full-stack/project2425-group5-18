import express, { NextFunction, Request, Response } from 'express';
import collectorService from '../service/collector.service';
import { CollectorInput } from '../types';

const collectorRouter = express.Router();

collectorRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collectors = await collectorService.getAllCollectors();
        res.status(200).json(collectors);
    } catch (error) {
        next(error);
    }
});

collectorRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collector = await collectorService.getCollectorById({ id: Number(req.params.id) });
        res.status(200).json(collector);
    } catch (error) {
        next(error);
    }
});

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