export class LoginDto {
    username: string | undefined;
    password: string | undefined;
}

export class LoginResponseDto {
    id: number | undefined;
    token: string | undefined;
    role: string | undefined;
}