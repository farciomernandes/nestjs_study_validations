import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './commom/core/http/transform-response.interceptor';
import { ExceptionFilterHttp } from './commom/filtros/filter-exception-http.filter';
import { UserModule } from './usuario/user.module';


@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilterHttp
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    }
  ],
})
export class AppModule {}
