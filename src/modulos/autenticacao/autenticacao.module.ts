import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule, 
    JwtModule.registerAsync({ //JwtModule (Dinâmico)
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SEGREDO_JWT'),
          signOptions: { expiresIn: '72h' }, //Tempo de expiração
        }
      },
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
})
export class AutenticacaoModule {}
