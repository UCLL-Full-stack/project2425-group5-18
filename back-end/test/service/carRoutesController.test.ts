import { mock } from 'node:test';
import { carRouter } from '../../controller/car.routes';
import carService from '../../service/car.service';

jest.mock('../service/car.service'); 

