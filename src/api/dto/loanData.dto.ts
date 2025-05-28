import {date} from "yup";

export class loanDataDto {
    bookId: number | undefined;
    userId: number | undefined;
    loanDate: string | undefined;
    dueDate: string | undefined;
    returnDate: string | undefined;
}

export class loanResponseDto {
    token: string | undefined;
}