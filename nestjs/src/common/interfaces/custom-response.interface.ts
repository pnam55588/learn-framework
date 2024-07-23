
export type CustomResponse<T> = {
    statusCode: number;
    message: string;
    path: string;
    status: 'success' | 'error';
    data: T;
};