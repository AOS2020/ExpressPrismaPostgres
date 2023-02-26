import {Request, Response} from "express";
import {CamService} from "../services/CamService";

const Cam = new CamService()

class CamController {

    async create(request : Request, response : Response) {
        try {
            let {
                name,
                location,
                url,
                way,
                token
            } = request.body




            await Cam.create({
                name,
                location,
                url,
                way,
                token
            })
            response.json({ message: "Camera cadastrada com sucesso" });

        } catch (error) {
            response.status(400).json({message: error.message});
        }
    }





    async update(request : Request, response : Response) {
        try {
            let {
                id,
                name,
                location,
                url,
                active,
                way,
                userId
            } = request.body

            await Cam.update({
                id,
                name,
                location,
                url,
                active,
                way,
                userId
            })


            response.json({ message: "Camera atualizada com sucesso" });

        } catch (error) {
            response.status(400).json({message: error.message});
        }

    }


async index (request : Request, response : Response){

    try {
        const id = request.body.userId;
        const result = await Cam.index(id);
        response.json(result);
      } catch (error) {
        response.status(400).json({ message: error.message });
      }

}

async delete(request: Request, response: Response) {
    const id: number = request.body.id;
    try {
      await Cam.delete({id})
      response.json({ message: "Camera deletada com sucesso!" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }


}

export {CamController}