import {client} from "../prisma/client";

interface IPlateCaputureCreate {
    image: string;
    plate: string;
    camId: number;
    userId: number;
    date_time: string;
    token: string;
}

class PlateCaptureService { /**
   * Cria registros da captura de movimento. 
   * Para isso é verificado se o token do usuario esta correto 
   * e ativo
   */
    async create({
        image,
        plate,
        camId,
        userId,
        date_time,
        token
    } : IPlateCaputureCreate) { 
        
        // verifica se o token pertence ao usuario bem como  se o token do usuario se encontra ativo

        const tokenUser = await client.users.findFirst({
            where: {
                id: userId
            },
            select: {
                token: true,
                active_token: true,
                active:true
            }
        });

        if (tokenUser.token !== token || !tokenUser.active_token || !tokenUser.active) {
            throw new Error("Não autorizado");
        }


        await client.plateCapture.create({
            data: {
                image,
                plate,
                camId,
                userId,
                date_time
            }
        });




    }

    async index({id, pagination} : {
        [k : string]: number
    }) {
        const result: Array<any> |null = await client.plateCapture.findMany({
            where: {
                userId: id
            },
            skip: pagination * 10,
            take: 10
        });

        if (result.length === 0) {
            throw new Error("O usuário não possui dados de captura de movimento");

        }
        for (let i = 0; i < result.length; i++) {
            result[i].image = 'http://localhost:3333/' + result[i].image
        }


        return result;
    }

    async indexAll(page:number
  ) {
      const result: Array<any> |null = await client.plateCapture.findMany({
          
          skip: page * 10,
          take: 10
      });

      if (result.length === 0) {
          throw new Error("Não há dados de captura de movimento");

      }
      for (let i = 0; i < result.length; i++) {
          result[i].image = 'http://localhost:3333/' + result[i].image
      }


      return result;
  }

    async delete({id}) {
        const verify: object |null = await client.plateCapture.findMany({
            where: {
                id
            },
            select: {
                id: true
            }

        });
        if (! verify) {
            throw new Error("Captura não existe na base de dados!");
        }

        await client.plateCapture.delete({where: {
                id
            }});
    }
}

export {
    PlateCaptureService
};
