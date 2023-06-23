import { Request, Response } from 'express';
import UsuarioRN from '../rules/UsuarioRN';

const userRN = new UsuarioRN();

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userRN.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ code: 10, message: error });
    }

  }

  async putUser(req: Request, res: Response) {
    try {
      const { id, name, email } = req.body;
      res.json(await userRN.updateUser(parseInt(id), name, email));
    } catch (error) {
      res.status(500).json({ code: 10, message: error });
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    // Implementar lógica para buscar um usuário pelo ID
    const user = await userRN.getUserById(id);
    res.json(user);
  }

  async postUserLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRN.handleLogin(email, password);

    res.json(user);
  }

  async postCreateUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      res.json(await userRN.createUser(email, name, password));
    } catch (error) {
      res.status(500).json({ code: 10, message: error });
    }
  }


}

export default UserController;
