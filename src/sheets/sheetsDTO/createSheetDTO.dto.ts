import { IsInt, IsString } from 'class-validator';

export class CreateSheetDTO {
  @IsString()
  id_exercise: string;
  @IsInt()
  id_client: number;
}
