import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

class UsuarioRN {
  private criptografy (password: string){
    const hash = createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }

  async getAllUsers() {
    try{
      const users = await prisma.usuario.findMany({select: {
        id_usuario: true,
        nome: true,
        email: true,
      }});
      return users;
    }catch(error)
    {
      throw error
    }
  }

  async getUserById(id: string) {
    const user = await prisma.usuario.findUnique({ where: { id_usuario: parseInt(id) } });
    return user;
  }

  async updateUser(id: number, name: string, email: string) {
    try{
      return await prisma.usuario.update({data: {
        nome: name,
        email: email
      }, where: { id_usuario: id } });
    }
    catch(error)
    {
      throw error
    }
  }

  async handleLogin(email: string, password: string) {
    const user = await prisma.usuario.findFirst({where: {
      email: email,
      senha: this.criptografy(password)
    }})
    
    return user;
  }

  async createUser(email: string, name: string, password: string) {
    try {
      
      const user = await prisma.usuario.findFirst({where:{
        email: email
      }})

      if(user) throw `Usuário com o e-mail ${email} já cadastrado.`

      return await prisma.usuario.create({
        data:{
          email: email,
          nome: name,
          senha: this.criptografy(password)
        }
      })
  
    } catch (error:any) {
      throw error
    }
  }



}

export default UsuarioRN;
