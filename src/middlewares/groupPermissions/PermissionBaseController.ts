import { Request, Response, NextFunction } from "express";
import { GetUser } from "../../useCases/getUser/getUser";
import { SecObjLeterals } from "./SecObjLiterals";



/*

Middleware de verificação de permissões 
É baseado nos privilégios dos grupos, ou seja, quais rotas o grupo tem acesso
Verifica em qual grupo, determinado usuário esta cadastrado 
bem como quais rotas o grupo deste usuário tem acesso

Para o cadastro das rotas e os privilégios ver em  prisma/seeds 

Apos o cadastro das rotas no bando de dados deve-se adicionar o endereço da rota 
em src/middleares/groupPermissions/SecObjLiterals.ts
*/

class PermissionBaseController {
  async checkPermissions(
    request: Request,
    response: Response,
    next: NextFunction
  ) {

    try {
      
      //obtem id do usuario pelo token jwt
      const getUser= new GetUser()
      const userId= await  getUser.UserLoged(request.headers.authorization)

      //objeto contendo lista de rotas
      const objectLiterals = new SecObjLeterals();

      let path:string = request.route.path;

      // tratamento da string da rota
      if (path[0] === "/")
        path = path.substring(
          1,
          path.lastIndexOf(":") < 0 ? path.length : path.lastIndexOf(":") - 1
        );
      let routePath = path.replace(/\//g, "_");

      if (routePath[0] === "_") routePath = routePath.substring(1, routePath.length);
      
      else if (routePath[routePath.length - 1] === "_")
        routePath = routePath.substring(0, routePath.length - 1);

        
      const PathAccess = objectLiterals.Controllers[routePath];
      
      //verifica se exite a rota no objeto, se verdadeiro executa query no banco
      if (PathAccess) {
         const resultAccess = await PathAccess(userId, routePath);

        if (!resultAccess === undefined || resultAccess.error)
          throw new Error(resultAccess.error); 
      } else {
        throw new Error(`Acesso Negado Para a Rota: ${path}!`);
      }

      next();
    } catch (error) {
      response.status(400).json({ messege: error.message });
    }
  }
}
export{ PermissionBaseController}