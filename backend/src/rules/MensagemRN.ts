import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MensagemRN {

    async createMessage(subject: string, text: string,) {
        try {

          return await prisma.mensagem.create({
            data:{
            assunto: subject, 
            conteudo: text,
            email: 'nata@moderniza.group',
            }
          })
      
        } catch (error:any) {
          throw error
        }
      }
  

}

export default MensagemRN;
