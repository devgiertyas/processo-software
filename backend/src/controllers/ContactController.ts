import { Request, Response } from 'express';
import ContatoRN from '../rules/ContatoRN';

const contatoRN = new ContatoRN();

class ContactController {

  async getAllContacts(req: Request, res: Response) {
    try {
      res.json(await contatoRN.getAllContacts());
    } catch (error) {
      res.status(500).json({ code: 10, message: error });
    }

  }

  async getContactById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await contatoRN.getContactById(id);
    res.json(user);
  }

  async postCreateContact(req: Request, res: Response) {
    try {
      const { name, email, telefone } = req.body;
      res.json(await contatoRN.createContact(email, name, telefone));
    } catch (error) {
      res.status(500).json({ code: 10, message: error });
    }
  }

  async putContact(req: Request, res: Response) {
    try {
      const { id, name, email, telefone } = req.body;
      res.json(await contatoRN.updateContact(parseInt(id), name, email,telefone));
    } catch (error) {
      res.status(500).json({ code: 10, message: error });
    }
  }


}

export default ContactController;
