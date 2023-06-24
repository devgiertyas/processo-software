import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MensagemContatoRN {

    async createContactMessage(id_contato: number, id_mensagem: number,) {
        try {

          return await prisma.mensagem_contato.create({
            data:{
               id_contato: id_contato,
               id_mensagem: id_mensagem,
               meio_envio: 'email'
            }
          })
      
        } catch (error:any) {
          throw error
        }
      }
  

}

export default MensagemContatoRN;
