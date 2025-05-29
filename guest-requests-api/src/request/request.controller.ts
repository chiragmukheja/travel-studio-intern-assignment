import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('api/requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  createRequest(@Body() body: { guestPhone: string; requestText: string }) {
    console.log('📥 Received request:', body);
    return this.requestService.createRequest(body);
  }

  @Get()
  getPendingRequests() {
    return this.requestService.getPendingRequests();
  }

  @Patch(':id')
  updateRequestStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.requestService.updateRequestStatus(Number(id), body.status);
  }
}
