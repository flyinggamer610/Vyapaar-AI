export interface Reminder {
    id: string;
    customerName: string;
    amount: string;
    dueDate: string;
    phone: string;
    status: 'pending' | 'paid' | 'overdue';
    originalText: string;
    createdAt: string;
}
