import { response, Router } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import knex from '../database/connection';

const sessionsRouter = Router();

sessionsRouter.post('/',async (request, response) => {
    const { email, password } = request.body;

    const user = await knex('users').where('email', email).first();

    if (!user){
        return response.status(400).json({message: 'Credentials not found.' })
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword){
        return response.status(400).json({message: 'Credentials not found.' })
    }

    const token = sign({}, 'f355961c3996631855f1b06d8aa3062f',  {
        subject: String(user.id),
        expiresIn: '1d'
    });

    return response.json({ user, token });

})

export default sessionsRouter;