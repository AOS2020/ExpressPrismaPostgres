import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "../useCases/authenticateUser/AuthenticateUserUseCase";

class AuthenticateUserController {
  async execute(request: Request, response: Response) {

    const {email, password} = request.body

  try {
    const authenticateUserCase= new AuthenticateUserUseCase()
    const token = await authenticateUserCase.execute({email, password})
    return response.json(token)

  } catch (error) {
    response.status(400).json({ message: error.message });
  }



}

}

export { AuthenticateUserController };
