import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The auto-generated id of the user
 *                      example: 1
 *                  firstName:
 *                      type: string
 *                      description: The first name of the user
 *                      example: John
 *                  lastName:
 *                      type: string
 *                      description: The last name of the user
 *                      example: Doe
 *                  username:
 *                      type: string
 *                      description: The username of the user
 *                      example: johndoe
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                      example: johndoe@web.be
 *                  password:
 *                      type: string
 *                      description: The password of the user
 *                      example: password
 *                  birthDate:
 *                      type: string
 *                      format: date
 *                      description: The birth date of the user
 *                      example: 1990-01-01
 *                  address:
 *                      type: string
 *                      description: The address of the user
 *                      example: Sesamstraat 20, 300 Leuven
 *              required:
 *                  - firstName
 *                  - lastName
 *                  - username
 *                  - email
 *                  - password
 *                  - birthDate
 *                  - address
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Retrieve a list of users
 *      description: Retrieve a list of users from the database
 *      responses:
 *          200:
 *              description: A list of users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getUserByUsername({ username: String(req.params.name) });
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Create a new user
 *      description: Create a new user with the provided data
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: The user was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Invalid input data
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});
export { userRouter };