import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Public } from '../../../common/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ClientService } from '../../queries/services/client.service';
import { Client } from '../../queries/entities/client';
import { RequestWithUser } from '../../../common/types/request';

@Controller('users')
@Public()
export class UsersController {
  constructor(private clientService: ClientService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req: RequestWithUser): Promise<Client | null> {
    return this.clientService.findOne(req.user.id);
  }
}
