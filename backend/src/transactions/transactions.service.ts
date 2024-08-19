import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createTransactionDto);
    return this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ id });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    await this.transactionRepository.update(id, updateTransactionDto);
    return this.transactionRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async getBudgetSummary(): Promise<{ totalRevenue: number; totalExpense: number; balance: number }> {
    const transactions = await this.transactionRepository.find();
    const totalRevenue = transactions
      .filter(t => t.type === 'revenue')
      .reduce((acc, t) => acc + t.montant, 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.montant, 0);
    const balance = totalRevenue - totalExpense;

    return { totalRevenue, totalExpense, balance };
  }
}
