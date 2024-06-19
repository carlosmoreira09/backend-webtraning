import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { NewClientDTO } from './clientDTO/cliente.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { SheetsService } from '../sheets/sheets.service';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientService: ClientsService,
    private readonly sheetService: SheetsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() clientRequest: NewClientDTO,
    @Headers('id_user') id_user: number,
  ) {
    try {
      return await this.clientService.create(clientRequest, id_user);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Dados Inválidos',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post('sheet/:id_sheet')
  async updateClientSheet(
    @Param('id_sheet') id_sheet: number,
    @Headers('id_client') id_client: number,
  ) {
    try {
      return await this.clientService.updateClientSheet(id_client, id_sheet);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Erro ao listar cliente',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id_user')
  async listAllByUser(@Param('id_user') id_user: number) {
    try {
      return await this.clientService.listAthletesByUser(id_user);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Erro ao listar cliente',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/sheet/:id_sheet')
  async getSheetByClient(@Param('id_sheet') id_sheet: number) {
    try {
      return await this.sheetService.listSheetById(id_sheet);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Erro ao listar cliente',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.clientService.remove(id);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Erro recuperar informações do cliente',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }
}
