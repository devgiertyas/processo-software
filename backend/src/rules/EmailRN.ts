import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.API_KEY!);

import { PrismaClient } from '@prisma/client';
import MensagemRN from './MensagemRN';
import MensagemContatoRN from './MensagemContatoRN';

const prisma = new PrismaClient();

class EmailRN {

    async sendEmail(payload: any) {
        const msg = {
          to: payload.contacts.map((contact: any) => {return contact.email}),
          from: 'nata@moderniza.group',
          subject: payload.subject,
          text: payload.text,
        };
      
        try {
          await sgMail.send(msg);

          const messageRN = new MensagemRN();

          //CRIA A MENSAGEM
          const message = await messageRN.createMessage(msg.subject, msg.text);

          if(message)
          {
            //CRIA OS CONTATOS E O ENVIOS
            const messageContactRN = new MensagemContatoRN()
            for (const contact of payload.contacts) {
                
                await messageContactRN.createContactMessage(contact.id_contato, message.id_mensagem)

            }

            await prisma.envio.create({data:{
                id_mensagem: message.id_mensagem,
            }})

            return {success: true, message: "Envio feito com sucesso."}
          }
            
        } catch (error) {
          console.error('Error sending email:', error);
          throw error
        }
      }

}

export default EmailRN;

