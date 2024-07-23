import { Injectable } from "@nestjs/common";
import { NextFunction, Request, Response} from "express";
@Injectable()
export class LoggerMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(req.method, ' | ', req.url, ' | ', req.body);
        next();
    }
}