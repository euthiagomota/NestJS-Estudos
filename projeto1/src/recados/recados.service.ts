import { Injectable, NotFoundException } from "@nestjs/common";
import { RecadosEntity } from "./entites/recados.entity";
import { CreateRecadoDto } from "./dto/create-recado.dto";
import { UpdateRecadoDto } from "./dto/update-recado.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RecadosService {
    constructor(
        @InjectRepository(RecadosEntity)
        private readonly recadoRepository: Repository<RecadosEntity>,
    ) { }

    throwNotFoundExceptionById() {
        throw new NotFoundException('Id do recado não encontrado!')
    }

    async findAll() {
        return await this.recadoRepository.find();
    }

    async findOne(id: number) {
        const recado = await this.recadoRepository.findOne({
            where: {
                id: id
            },
        })
        if (!recado) return this.throwNotFoundExceptionById();

        return recado;
    }

    async create(createRecadoDto: CreateRecadoDto): Promise<RecadosEntity> {
        const novoRecado = {
            ...createRecadoDto,
            lido: false,
        }
        const recado = await this.recadoRepository.create(novoRecado);

        return this.recadoRepository.save(recado);
    }

    async update(id: number, updateRecadoDto: UpdateRecadoDto) {

        const partialUpdateRecadoDto = {
            lido: updateRecadoDto.lido,
            texto: updateRecadoDto.texto,
        }
        const recado = await this.recadoRepository.preload({
            id,
            ...partialUpdateRecadoDto
        });
        if (!recado) return this.throwNotFoundExceptionById();

        return await this.recadoRepository.save(recado);
    }

    async remove(id: number) {
        const recadoToDelete = await this.recadoRepository.findOne({
            where: {
                id: id,
            }
        })

        if (!recadoToDelete) {
            this.throwNotFoundExceptionById();
            return false
        }
        this.recadoRepository.delete(recadoToDelete.id)
        return true;
    }
}