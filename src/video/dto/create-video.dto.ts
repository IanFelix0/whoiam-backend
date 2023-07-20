import { IsString, IsUrl } from "class-validator";
import { Video } from "../entities/video.entity";

export class CreateVideoDto extends Video{
    @IsString()
    title: string;
    @IsString()
    descripition?: string;
    @IsUrl()
    url: string;
}
