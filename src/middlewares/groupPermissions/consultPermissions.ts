import { client } from "../../prisma/client";

interface consultPermissionsI { user: number; route: string }

class consultPermissions {
  async permissionDB({ user, route }: consultPermissionsI) {


    try {
      const pathRoute = route.replace(/_/g, "/");

      const result = await client.$transaction(async (client) => {

        //obtem id do grupo que o usuario logado pertence
        const UserId: Array<{ groupId: number }> = await client.users.findMany({
          where: {
            id: user,
          },
          select: {
            groupId: true,
          },
        });

        //se a consulta retornar vazia retorna erro
        if (UserId.length == 0) {
          return "Usuário não encontrado";
        }
      //verifica se existe a rota na base de dados
        const rota = await client.permissionGroup.findMany({
          where: {
            groupId: UserId[0].groupId,
            permission: {
              rota: {
                equals: pathRoute,
              },
            },
          },
          select: {
            permission: {
              select: {
                rota: true,
              },
            },
          },
        });

        // se a rota não for encontrada retorna array vazio
        if (rota.length == 0) {
          return rota;
        }
        return rota[0].permission.rota;
      });
      if(!result || result.length == 0){
        throw new Error("Acesso negado para a rota: " + pathRoute);
        
      }
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { consultPermissions };
