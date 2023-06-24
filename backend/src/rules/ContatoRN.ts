import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ContatoRN {

  async getAllContacts() {
    try{
        return await prisma.contato.findMany({select:{
            id_contato: true,
            nome: true,
            email: true,
            celular: true
        }})

    }catch(error)
    {
      throw error
    }
  }

  async getContactById(id: string) {
    return await prisma.contato.findUnique({ where: { id_contato: parseInt(id) } });
  
  }

  async updateContact(id: number, name: string, email: string, telefone: string) {
    try{
      return await prisma.contato.update({data: {
        nome: name,
        email: email,
        celular: telefone
      }, where: { id_contato: id } });
    }
    catch(error)
    {
      throw error
    }
  }

  async createContact(email: string, name: string, telefone: string) {
    try {
      
      const user = await prisma.contato.findFirst({where:{
        email: email
      }})

      if(user) throw `Contato com o e-mail ${email} já cadastrado.`

      return await prisma.contato.create({
        data:{
          email: email,
          nome: name,
          celular: telefone,
        }
      })
  
    } catch (error:any) {
      throw error
    }
  }



}

export default ContatoRN;
