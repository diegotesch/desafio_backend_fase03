import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions = [...this.transactions, transaction];

    return transaction;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc: Balance, transaction: Transaction) => {
        const { type } = transaction;
        acc[type] += transaction.value;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }
}

export default TransactionsRepository;
