import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class FilterParam {
  @ApiProperty({ example: 'New Post!', description: 'Title of the event' })
  @IsString()
  title: string;

  @ApiProperty({ example: '2023-05-10', description: 'Date in ISO 8601 format' })
  @IsDateString()
  date: string;
}