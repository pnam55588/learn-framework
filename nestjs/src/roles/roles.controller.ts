import { Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Public } from 'src/common/decorators/Public.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  
  @Post('init')
  @Public()
  init() {
    return this.rolesService.init();
  }
}
