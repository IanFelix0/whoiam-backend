import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VideoService {

  constructor(private readonly prisma: PrismaService){}

  async create(createVideoDto: CreateVideoDto) {
    const data : Prisma.VideoCreateInput = {
      ...createVideoDto
    }

    const createdVideo = await this.prisma.video.create({  data  })
    return { ...createdVideo }
  }

  async findAll() {
    return await this.prisma.video.findMany();
  }

  findOne(id: number) {
    this.prisma.video.findUnique({
      where: { id }
    })
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    const data: Prisma.VideoUpdateInput = {
      ...updateVideoDto
    }
    const updatedVideo = await this.prisma.video.update({where: {id}, data})

    return {...updatedVideo}
  }

  remove(id: number) {
    this.prisma.video.delete({
      where: { id }
    })
  }
}
