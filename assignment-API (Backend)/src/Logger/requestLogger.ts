import { Request, Response, NextFunction } from 'express';

/** Implemented as a static function to track API calls need not be instantiated since state is not essential */
/** To Log the API Calls */
export class Logger {
  static info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  static error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}

export class RequestLogger {
  static log(req: Request, res: Response, next: NextFunction): void {
    Logger.info(`[${req.method}] ${req.url}`);
    next();
  }
}