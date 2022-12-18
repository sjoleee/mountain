import { InternalServerErrorException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

export async function checkPassword(
  clientPassword: string,
  dbPassword: string,
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(clientPassword, dbPassword);
    return result;
  } catch (e) {
    throw new InternalServerErrorException(
      '비밀번호 compare에 실패하였습니다.',
    );
  }
}
