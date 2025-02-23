import { Injectable, NotFoundException } from "@nestjs/common";
import { RecadosEntity } from "./entites/recados.entity";
import { CreateRecadoDto } from "./dto/create-recado.dto";
import { UpdateRecadoDto } from "./dto/update-recado.dto";

@Injectable()
export class RecadosService {

        private lastId = 1;
        private recados: RecadosEntity[] = [
            {
                id: 1,
                dataRecado: new Date(),
                de: "Thiago",
                para: "Sara",
                lido: false,
                texto: "Te amo!"
            },
    ];

    throwNotFoundExceptionById() {
        throw new NotFoundException('Id do recado não encontrado!')
    }
    
    async findAll() {
        return this.recados;
    }
    
    async findOne(id: number) {
        const resul = this.recados.find(item => item.id === id)
        if(!resul) {
           this.throwNotFoundExceptionById();
        }
        return resul
    }

    async create(createRecadoDto: CreateRecadoDto): Promise<RecadosEntity> {
        this.lastId++;
        const id = this.lastId;
        const newRecado: RecadosEntity = {
            id,
            ...createRecadoDto,
            lido: false,
            dataRecado: new Date()
        }
        this.recados.push(newRecado);
        return newRecado;
    }

    async update(id: number, updateRecadoDto: UpdateRecadoDto) {
       const recadosExistenteIndex = this.recados.findIndex(
        item => item.id === id,
       );

       if (recadosExistenteIndex === -1) {
        this.throwNotFoundExceptionById();
       }
       const recadoExistente = this.recados[recadosExistenteIndex];

       const recadoAtualizado: RecadosEntity = this.recados[recadosExistenteIndex] = {
            ...recadoExistente,
            ...updateRecadoDto,
        };

        return recadoAtualizado;
    }

    async remove(id: number) {
        //busca o índice do objeto localizado no array pelo id
        const recadoExistenteIndex = this.recados.findIndex(
            item => item.id === id,
        );
        //se o item não for existente
        if(recadoExistenteIndex === -1) {
            this.throwNotFoundExceptionById();
        }
        this.recados.splice(recadoExistenteIndex, 1)
        return "item deletado com sucesso!"
    }
}