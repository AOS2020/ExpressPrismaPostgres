import {client} from "../prisma/client";

interface ICam {
    name: string;
    location?: string;
    url: string;
    way: string;
    
}

interface ICamUpadate extends ICam {
    id: number;
    active: boolean;
    userId:number

}


interface ICamCreate extends ICam {

    token: string

}

 

class CamService {
    async create({
        name,
        location,
        url,
        way,
        token
    } : ICamCreate) {



        const verifyUrlCam: object |null = await client.cam.findFirst({
            where: {
                url
            },
            select: {
                url: true
            }
        });

      
        if(!token){
            throw new Error("Não autorizado!");
            
        }

        if (verifyUrlCam) {
            throw new Error("Camera já existe na base de dados!");
        }


        const getUser = await client.users.findFirst({
            where: {
                token
            },
            select: {
                token: true,
                active_token: true,
                active:true,
                id:true
            }

            
        });
       const Obj= Object.keys(getUser).length

        if(Obj==0){
            throw new Error("Não autorizado");
        }

        if(!getUser.active_token || getUser.token != token || !getUser.active){
            throw new Error("Não autorizado");
            
        }

        await client.cam.create({
            data: {
                name,
                location,
                url,
                way,
                userId:getUser.id
            }
        });
    }



    async index(id : number) {
        const result: object |null = await client.cam.findMany({
            where: {
                userId: id
            }
        });

        if (Object.keys(result).length === 0) {
            throw new Error("O usuário não possui cameras cadastradas");

        }

        return result;

    }

    async delete({id}) {
        
        if(!id){
            throw new Error("informe o id da camera!");
        }
        
        const verify: object |null = await client.cam.findFirst({
            where: {
                id
            },
            select: {
                name: true
            }
        });
        if (! verify) {
            throw new Error("Camera não existe na base de dados!");
        }

        await client.cam.delete({where: {
                id
            }});
    }

    async update({
        id,
        name,
        location,
        url,
        active,
        way,
        userId
    } : ICamUpadate) {
        await client.cam.update({
            where: {
                id
            },
            data: {
                name,
                location,
                url,
                active,
                way,
                userId
            }
        });
    }
}

export {
    CamService
};
