//Arquivo de tratativa de erro
//Descobre se é fastfy ou express e continuar a aplicação

import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";


@Catch(HttpException)
export class ExceptionFilterHttp implements ExceptionFilter {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost){
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: Error, host: ArgumentsHost) {

        const context = host.switchToHttp();

        const request = context.getRequest();
        const response = context.getResponse();

        const { status, body } = exception instanceof HttpException ?
        {
            status: exception.getStatus(),
            body: exception.getResponse()
        }
        :
        {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                message: exception.message,
                path: request.path
            }
        };

        this.httpAdapter.reply(response, body, status);
    }

}