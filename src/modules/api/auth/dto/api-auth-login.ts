import { IsString, MaxLength } from 'class-validator';
import { IsNotBlank } from '../../../common/validation/decorators/custom-validators';

export class AuthLogin {
  @IsString()
  @IsNotBlank()
  @MaxLength(25)
  userName: string;

  @IsString()
  @IsNotBlank()
  @MaxLength(25)
  password: string;
}
