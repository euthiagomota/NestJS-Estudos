import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { RecadosService } from './recados.service';

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
    findOne(@Param('id') id: number) {
        return this.recadosService.findOne(id);
    }

    @Patch(':id')
    updateRecado(@Param('id') id: number, @Body() body: any) {
        return this.recadosService.update(id, body);
    }

    @Post()
    createRecado(@Body() body: any) {
        return this.recadosService.create(body);
    }

    @Delete(':id')
    deleteRecado(@Param('id') id: number) {
        return this.recadosService.remove(id);
    }
}
