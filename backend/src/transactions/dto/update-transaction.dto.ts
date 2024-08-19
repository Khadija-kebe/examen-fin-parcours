import { IsOptional, IsEnum, IsString, IsNumber, IsDateString } from 'class-validator';
import { TransactionType } from '../transaction.entity';

export class UpdateTransactionDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  montant?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
