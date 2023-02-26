import {  verify } from "jsonwebtoken";

 interface TokenInterface {
    id:number
}

class GetUser{
    async UserLoged(token:string){
        try {
  
            token = token.substring(7);
            const decode  = await verify(token, process.env.JWT);
            const  {id}  = decode as TokenInterface;
            if (!id) throw new Error("Usuário indefinido");
            

         return id;
          } catch (error) {
            throw new Error(error.message);
            ;
          }
    }
}

export{GetUser}