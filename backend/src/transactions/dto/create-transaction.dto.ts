import { IsEnum, IsString, IsNumber, IsDateString } from 'class-validator';
import { TransactionType } from '../transaction.entity';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  category: string;

  @IsNumber()
  montant: number;

  @IsDateString()
  date: string;
}
