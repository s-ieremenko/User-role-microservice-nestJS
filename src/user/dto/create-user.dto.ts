import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsUUID('4', { each: true })
  @IsString()
  @IsOptional()
  readonly roleUuid?: string | null = null;
}
