import { NextFunction, Request, Response } from 'express';
import { RemixService } from './remix.service';
export declare class RemixController {
    private readonly remixService;
    constructor(remixService: RemixService);
    handler(request: Request, response: Response, next: NextFunction): Promise<void>;
}
