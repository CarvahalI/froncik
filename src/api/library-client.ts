import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {LoginDto, LoginResponseDto} from "./dto/login.dto";
import {bookDataDto, bookResponseDto} from "./dto/bookData.dto";
import {userDataDto, userResponseDto} from "./dto/userData.dto";
import {loanDataDto, loanResponseDto} from "./dto/loanData.dto";
import {LoanToAddDataDto} from "./dto/LoanToAddData.dto";
import {DeleteBookDto, deleteBookResponseDto} from "./dto/DeleteBook.dto";
import {deleteUserDto} from "./dto/deleteUser.dto";

export type ClientResponse<T> = {
    success: boolean,
    data: T,
    statusCode: number
}
export class LibraryClient {
    private client: AxiosInstance;

    constructor() {
        console.log('LibraryClient');
        this.client = axios.create({
            baseURL: 'http://localhost:8081',
        });
    }

    public async login(data: LoginDto): Promise<{role: string | undefined;
    data: LoginResponseDto | undefined;
    success: boolean;
    statusCode: number;}> {
        try{
            const response: AxiosResponse<LoginResponseDto> = await this.client.post('/auth/login', data);
            this.client.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            localStorage.setItem("jwtToken", `${response.data.token}`);
            localStorage.setItem("role", `${response.data.role}`);
            localStorage.setItem("user_id", `${response.data.id}`);

            return {
                success: true,
                data: response.data,
                role: response.data.role,
                statusCode: response.status,
            }
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: undefined,
                role: undefined,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async getBooks(): Promise<ClientResponse<any | null>> {
        try {
            console.log('ok1');
            const response = await this.client.get('/api/books/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: 200,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async addBook(bookData: bookDataDto): Promise<ClientResponse<bookResponseDto | null>> {
        try {
            const response = await this.client.post('/api/books/add', bookData);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async deleteBook(deleteBookDto: DeleteBookDto): Promise<ClientResponse<deleteBookResponseDto | null>> {
        try {
            const response = await this.client.delete('/api/books/delete', {
                data: deleteBookDto
            });
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }


    public async getUsers(): Promise<ClientResponse<any | null>> {
        try {
            console.log('ok2');
            const response = await this.client.get('/api/user/getAll');
            return {
                success: true,
                data: response.data,
                statusCode: 200,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
            success: false,
            data: null,
            statusCode: axiosError.response?.status || 0
        };
}
}

    public async addUser(userData: userDataDto): Promise<ClientResponse<userResponseDto | null>> {
        try {
            const response = await this.client.post('/auth/register', userData);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async deleteUser(deleteUser: deleteUserDto): Promise<ClientResponse<userResponseDto | null>> {
        try {
            const response = await this.client.delete('/api/user/delete', {data: deleteUser});
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }

    public async addLoan(LoanToAddData: LoanToAddDataDto): Promise<ClientResponse<loanResponseDto | null>> {
        try {
            const response = await this.client.post('/api/loan/borrow', LoanToAddData);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }
    public async getLoans(): Promise<ClientResponse<loanResponseDto[] | null>> {
        try {
            const response = await this.client.get('/api/loan/all');
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }
    public async endLoan(loanId: number): Promise<ClientResponse<loanResponseDto | null>> {
        try {
            const response = await this.client.post('/api/loan/return/{id}', loanId);
            return {
                success: true,
                data: response.data,
                statusCode: response.status,
            };
        } catch (error) {
            const axiosError = error as AxiosError<Error>;
            return {
                success: false,
                data: null,
                statusCode: axiosError.response?.status || 0
            };
        }
    }
}
