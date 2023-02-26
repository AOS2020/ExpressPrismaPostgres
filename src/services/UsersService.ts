import {client} from "../prisma/client";
import {hash} from "bcryptjs";

import crypto from 'crypto'
interface IUsers {
    name: string;
    password: string;
    address: string;
    neighborhood: string;
    county: string;
    state: string,
    location: string;
    groupId: number;
    store: boolean;
    type_store: string;
    phone?: string;

}

interface IUsersCreate extends IUsers {
    email: string;

}

interface IUsersUpdate extends IUsers {
    id: number;

}

class UsersService {
    async create({
        name,
        password,
        address,
        neighborhood,
        county,
        state,
        location,
        groupId,
        store,
        type_store,
        email,
        phone
    } : IUsersCreate) {

        const verify: object |null = await client.users.findFirst({
            where: {
                email: email
            },
            select: {
                email: true
            }
        });

        if (verify) {
            throw new Error("Usuário já existe na base de dados");
        }

        phone = phone.replace(/[^\w]/gi, "");
     
        //gera token
        const token = await crypto.randomBytes(30).toString('hex');
     
        //Encrypt the password
        await hash(password, 10, (err, hash) => {
            if (err) 
                throw new Error(String(err));
            

            password = hash;
        });
        //Verifica se o usuario extiste na base de dados
  
    //Cria usuario
        await client.users.create({
            data: {
                name,
                password,
                address,
                neighborhood,
                county,
                state,
                location,
                groupId,
                store,
                type_store,
                email,
                phone,
                token
            }
        });
    }

    //lista dados do usuario
    async index(id : number) {

        if (!id) {
            throw new Error("Informe o id do usuário!");
        }

          const result = await client.users.findFirst({
                where: {
                    id: id
                }
            })
if(!result){
    throw new Error("Usuário não encontrado");
    
}
        return result;

    }
    //Lista todos os usuarios
    async indexAll( page:number) {


          const result = await client.users.findMany({
                
                skip: 1 *page,
                take: 10
            })

        return result;

    }

    async delete({id}) {
        const verify: object |null = await client.users.findFirst({
            where: {
                id
            },
            select: {
                email: true
            }
        });
        if (!verify) {
            throw new Error("Usuário não existe na base de dados!");
        }

        await client.users.delete({where: {
                id
            }});
    }

    async update({
        id,
        name,
        password,
        address,
        neighborhood,
        county,
        state,
        location,
        groupId,
        store,
        type_store,
        phone
    } : IUsersUpdate) {
        await client.users.update({
            where: {
                id
            },
            data: {
                name,
                password,
                address,
                neighborhood,
                county,
                state,
                location,
                groupId,
                store,
                type_store,
                phone
            }
        });
    }

    async updateTokenUser({id} : {
        id: number
    }) {

        const token = await crypto.randomBytes(30).toString('hex');
        const result = await client.users.update({
            where: {
                id: id
            },
            data: {
                token
            }
        })

        return result.token
    }

}

export {
    UsersService
};
