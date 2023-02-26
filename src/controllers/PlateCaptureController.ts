import { Request, Response } from "express";
import { PlateCaptureService } from "../services/PlateCaptureService";

const plateCapture = new PlateCaptureService();

class PlateCaptureController {
  async create(request: Request, response: Response) {
    try {
      let { plate, camId, userId, date_time, token } = request.body;

      const { path } = request.file;

      camId = +camId;
      userId = +userId;

      date_time = new Date();

      if (request.file) {
        plateCapture.create({
          image: path,
          plate,
          camId,
          userId,
          date_time,
          token,
        });
      } else {
        throw new Error("Não é um tipo de arquivo válido");
      }

      response.status(200).json({ message: "Arquivo alvo com sucesso" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
  async index(request: Request, response: Response) {
    try {
      const { id, pagination } = request.body;

      const result = await plateCapture.index({ id, pagination });
      response.json(result);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async indexAll(request, response) {
    try {
      const page = request.body.page;
      const result = await plateCapture.indexAll(page);
      response.json(result);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export { PlateCaptureController };
