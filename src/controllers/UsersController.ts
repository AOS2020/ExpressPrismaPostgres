
import { Request, Response } from "express";
import {UsersService} from "../services/UsersService"

const Users= new UsersService()

class UsersController {
  async create(request: Request, response: Response) {
    try {
      let {
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
        phone      } = request.body;

      
   await   Users.create({      
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
    phone})


      response.json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
  async index(request: Request, response: Response) {
    try {
      const {id} =request.body


      const result = await Users.index(id)
      response.json(result);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
  async indexAll(request: Request, response: Response) {
    try {
      const {page} =request.body

      const result = await Users.indexAll(page)


      response.json(result);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {

      let {
data
      } = request.body;

   await  Users.update( {   ...data})

      response.json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    const id: number = request.body.id;
    try {
      await Users.delete({id})
      response.json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async updateTokenUser(request: Request, response: Response) {
    const {id} = request.body;
    try {
     const result= await Users.updateTokenUser({id})
      response.json({ message: "Token atualizado com sucesso!", result });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export { UsersController };
