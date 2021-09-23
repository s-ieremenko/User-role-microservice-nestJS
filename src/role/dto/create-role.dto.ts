import { IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  readonly name: string;

  @IsUUID('4', { each: true })
  @IsString({ each: true })
  readonly permissionUuids: string[];
}
