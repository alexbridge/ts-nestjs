import { Controller, Get, Query } from '@nestjs/common';

@Controller('/echo')
export class EchoController {
  @Get()
  async echo(@Query('name') name: string): Promise<string> {
    return name;
  }
}
