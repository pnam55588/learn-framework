import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/Public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('init')
    @Public()
    async init(): Promise<string> {
        return this.appService.init();
    }
}
