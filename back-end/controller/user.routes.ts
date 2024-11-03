import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { User } from '../model/user';

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
userRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Retrieve a single user
 *      description: Retrieve a single user from the database
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The id of the user to retrieve
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: A single user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: The user was not found
 */
userRouter.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send();
        }
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
userRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, username, email, password, birthDate, address } = req.body;
        const existingUsernames = await userService.getAllUsernames();

        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password,
            birthDate: new Date(birthDate),
            address
        });

        const validationMessage = user.registerUser(existingUsernames);
        if (validationMessage !== "User registered successfully.") {
            return res.status(400).send({ message: validationMessage });
        }

        const newUser = await userService.createUser(user);
        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
});

export { userRouter };