import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Controller('recados')
export class RecadosController {

    constructor(
        private readonly recadosService: RecadosService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll() {
        return this.recadosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.findOne(id);
    }

    @Patch(':id')
    updateRecado(@Param('id', ParseIntPipe) id: number, @Body() UpdateRecadoDto: UpdateRecadoDto) {
        return this.recadosService.update(id, UpdateRecadoDto);
    }

    @Post()
    createRecado(@Body() createRecadoDto: CreateRecadoDto) {
        return this.recadosService.create(createRecadoDto);
    }

    @Delete(':id')
    deleteRecado(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.remove(id);
    }
}
