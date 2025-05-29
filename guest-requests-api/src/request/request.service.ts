import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  createRequest(data: { guestPhone: string; requestText: string }) {
    return this.prisma.request.create({
      data: {
        guestPhone: data.guestPhone,
        requestText: data.requestText,
      },
    });
  }

  getPendingRequests() {
    return this.prisma.request.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'desc' },
    });
  }

  updateRequestStatus(id: number, status: string){
        return this.prisma.request.update({
            where: { id },
            data: { status },
        });
    }
}
