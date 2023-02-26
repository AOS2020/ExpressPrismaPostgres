import {compare} from 'bcryptjs'
import {client} from '../../prisma/client'
import {sign} from 'jsonwebtoken'

interface IRequest {
    email: string, password: string
}

class AuthenticateUserUseCase {

    async execute({email, password}: IRequest) {
        


        const userPasswordVerify = await client.users.findFirst({
            where: {email},
           
        })

        // verifica se o usuario existe
        if (! userPasswordVerify) {
            throw new Error("Usuário ou senha incorreto")
        }

        // verifica se a senha está correta
        const passwordMatch = await compare(password, userPasswordVerify.password)

        if (! passwordMatch) {
            throw new Error("Usuário ou senha incorreto")
        }

        //gerar token usuario
        const token = sign({id:userPasswordVerify.id}, process.env.JWT,{subject:String(userPasswordVerify.id), expiresIn:"3h" })

        return {id:userPasswordVerify.id,name:userPasswordVerify.name, group:userPasswordVerify.groupId, id_access:userPasswordVerify.token,token}
    }

}

export {
    AuthenticateUserUseCase
}
