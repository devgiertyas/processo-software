import { Request, Response } from 'express';
import EmailRN from '../rules/EmailRN';

const emailRN = new EmailRN();

class MessageController {

  async sendMessage(req: Request, res: Response) {
    try {
      res.json(await emailRN.sendEmail(req.body.payload));
    } catch (error) {
      res.status(500).json({ code: 10, message: error });
    }

  }

}

export default MessageController;
