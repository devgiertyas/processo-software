import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  // Verifique se o erro é uma exceção personalizada com status definido
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    // Caso contrário, retorne um erro genérico com status 500
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default errorHandler;
