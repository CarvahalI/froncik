import React from 'react';

interface Loan {
    id: number;
    amount: number;
    // dodaj tu inne pola pożyczki, np. date: string, borrower: string itp.
}

const LoansListReader: React.FC = () => {
    // na razie zostaw pustą tablicę lub mockowe dane:
    const loans: Loan[] = [];

    return (
        <div>
            <h2>Lista pożyczek</h2>
            {loans.length === 0 ? (
                <p>Brak danych do wyświetlenia.</p>
            ) : (
                <ul>
                    {loans.map(loan => (
                        <li key={loan.id}>
                            ID: {loan.id}, kwota: {loan.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LoansListReader;
