import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import { BigRequest } from '../types';

interface JwtPayload {
  id: string;
}

const auth = async (req: BigRequest, res: Response, next: NextFunction) => {

  try {

    const token = req.headers.authorization?.split(' ')[1];

    // Check if the token is the jwt one or the google one:
    const isCustomAuth = token?.length as number < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.AUTH_SECRET as string) as JwtPayload

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token as string);

      req.userId = decodedData?.sub as string;
    }

    next();

  } catch (error: any) {
    console.log(error);
    return error.message
  }
}

export default auth;