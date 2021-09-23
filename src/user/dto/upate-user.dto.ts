import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly roleUuid?: string | null = null;
}
