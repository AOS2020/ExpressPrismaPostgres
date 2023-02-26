import { client } from "../prisma/client";


interface IAlertServiceCreate{
       

description:string 
emails: string
vehicle_type?: string
vehicle_color?:string
vehicle_model?:string
vehicle_make?:string
plate: string
userId:number      
  }


class AlertService{
    async create({description ,
        emails,
        vehicle_type,
        vehicle_color,
        vehicle_model,
        vehicle_make,
        plate,
        userId
           }:IAlertServiceCreate){



await client.alert.create({data:{
    description ,
        emails,
        vehicle_type,
        vehicle_color,
        vehicle_model,
        vehicle_make,
        plate,
        userId,

}})
     

    }

    async update({         
        description ,
        emails,
        vehicle_type,
        vehicle_color,
        vehicle_model,
        vehicle_make,
        plate, userId}:IAlertServiceCreate){


            await client.alert.update({
                where:{id:userId},
                data:{
                description ,
                    emails,
                    vehicle_type,
                    vehicle_color,
                    vehicle_model,
                    vehicle_make,
                    plate,
                    
            
            }})

    }


    async index(id : number) {
        const result: object |null = await client.alert.findMany({
            where: {
                userId: id
            }
        });

        if (Object.keys(result).length === 0) {
            throw new Error("O usuário não possui alertas cadastradas");

        }

        return result;

    }
    async indexAll(page : number) {
        const result: Array<any> |null = await client.alert.findMany({
            skip:page*10,
            take:10
        });

        if (result.length === 0) {
            throw new Error("O usuário não possui alertas cadastradas");

        }

        return result;

    }

    async delete({id}) {
        const verify: object |null = await client.alert.findFirst({
            where: {
                id
            },
            select: {
                id: true
            }
        });
        if (! verify) {
            throw new Error("Alerta não existe na base de dados!");
        }

        await client.cam.delete({where: {
                id
            }});
    }

}


export {AlertService}