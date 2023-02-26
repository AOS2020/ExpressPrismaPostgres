import { Request, Response } from "express";
import { AlertService } from "../services/AlertService";


const Alert = new AlertService()

class AlertController {
    async create(request: Request, response: Response) {
      try {
        let {
            description ,
            emails,
            vehicle_type,
            vehicle_color,
            vehicle_model,
            vehicle_make,
            plate,
            userId
        } = request.body;
  
        
     await   Alert.create({description ,
        emails,
        vehicle_type,
        vehicle_color,
        vehicle_model,
        vehicle_make,
        plate,
        userId      
    })
  
  
        response.json({ message: "Alerta criado com sucesso" });
      } catch (error) {
        response.status(400).json({ message: error.message });
      }
    }
    async index(request: Request, response: Response) {
        try {
            const id = request.body.userId;
            const result = await Alert.index(id);
            response.json(result);
          } catch (error) {
            response.status(400).json({ message: error.message });
          }
    }

    async indexAll(request: Request, response: Response) {
      try {
          const page=request.body.page
          const result = await Alert.indexAll(page);
          response.json(result);
        } catch (error) {
          response.status(400).json({ message: error.message });
        }
  }
  
    async update(request: Request, response: Response) {
      try {

        let {
            
            description ,
            emails,
            vehicle_type,
            vehicle_color,
            vehicle_model,
            vehicle_make,
            plate,
            userId
        } = request.body;
  
     await  Alert.update( {    
        description ,
        emails,
        vehicle_type,
        vehicle_color,
        vehicle_model,
        vehicle_make,
        plate,
        userId})
  
        response.json({ message: "Alerta atualizado com sucesso!" });
      } catch (error) {
        response.status(400).json({ message: error.message });
      }
    }
  
    async delete(request: Request, response: Response) {
      const id: number = request.body.id;
      try {
        await Alert.delete({id})
        response.json({ message: "Alerta deletado com sucesso!" });
      } catch (error) {
        response.status(400).json({ message: error.message });
      }
    }
  }
  
  export { AlertController };
  