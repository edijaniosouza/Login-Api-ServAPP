import { Request, Response, NextFunction } from 'express';
import admin, { auth } from 'firebase-admin'
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import User from '../model/user';
require("dotenv").config()

var key = process.env.GOOGLE_APPLICATION_CREDENTIALS

if (key != null) {
    var serviceAccount = require(key);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Criar de crud

// Adicionar usuario
const newUser = async (req: Request<{}, {}, {}, User>, res: Response, next: NextFunction) => {
    const { query } = req;
    if (query.email == null) {
        res.status(400).json({
            error: 'Email invalid'
        })
    }
    else if (query.password == null) {
        res.status(400).json({
            error: 'Password invalid'
        })
    } else {
        admin.auth().createUser({
            email: query.email,
            password: query.password,
            displayName: query.displayName,
        })
            .then((userRecord) => {
                res.status(201).json({
                    user: userRecord.displayName,
                    email: userRecord.email,
                    password: userRecord.passwordHash
                })
                console.log(typeof userRecord.email)
                console.log(`Usuário, ${userRecord.displayName}, criado com sucesso!`)
            }).catch((e)=> {
                return res.json({
                    error: e
                })
            })
    }
}

// Retornar todos usuarios
const getAllRelatedUsers = async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: 'working in progress..'
    })
}

// Retornar um usuario
const getUser = async (req: Request, res: Response, next: NextFunction) => { }

// Validar usuario
const validateUser = async (req: Request, res: Response, next: NextFunction) => { }

// Deletar usuario
const deleteUser = async (req: Request, res: Response, next: NextFunction) => { }

export default { getAllRelatedUsers, getUser, newUser, validateUser, deleteUser }