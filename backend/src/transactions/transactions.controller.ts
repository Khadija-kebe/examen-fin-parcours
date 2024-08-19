import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('ajout')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get('summary')
  getBudgetSummary() {
    return this.transactionService.getBudgetSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transactionService.remove(id);
  }
}
