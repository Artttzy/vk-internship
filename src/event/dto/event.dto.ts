import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class EventDto {
  @ApiProperty({ example: 'New Post!', description: 'Title of the event' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: true, description: 'Status shows if user authorized or not' })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}