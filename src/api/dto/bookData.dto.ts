export class bookDataDto {
    title: string | undefined;
    author: string | undefined;
    isbn: string | undefined;
    publishYear: number | undefined;
    availableCopies: number | undefined;
    publisher: string | undefined;
}

export class bookResponseDto {
    token: string | undefined;
}