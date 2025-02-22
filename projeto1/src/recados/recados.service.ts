import { Injectable } from "@nestjs/common";
import { RecadosEntity } from "./entites/recados.entity";

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
    
    async findAll() {
        return this.recados;
    }
    
    async findOne(id: number) {
        const resul = this.recados.find(item => item.id === +id)
        console.log()
        console.log(resul)
        return resul
    }

    async create(body: any): Promise<RecadosEntity> {
        this.lastId++;
        const id = this.lastId;
        const newRecado: RecadosEntity = {
            id,
            ...body,
        }
        this.recados.push(newRecado);
        return newRecado;
    }

    async update(id: number, body: any) {
       const recadosExistenteIndex = this.recados.findIndex(
        item => item.id === +id,
       );

       if (recadosExistenteIndex === -1) {
        return "recado não existente, por favor tente novamente com outro ID."
       }
       const recadoExistente = this.recados[recadosExistenteIndex];

       const recadoAtualizado: RecadosEntity = this.recados[recadosExistenteIndex] = {
            ...recadoExistente,
            ...body,
        };

        return recadoAtualizado;
    }

    async remove(id: number) {
        //busca o índice do objeto localizado no array pelo id
        const recadoExistenteIndex = this.recados.findIndex(
            item => item.id === +id,
        );
        //se o item não for existente
        if(recadoExistenteIndex === -1) {
            return "recado não existente, por favor tente novamente com outro ID."
        }
        this.recados.splice(recadoExistenteIndex, 1)
        return "item deletado com sucesso!"
    }
}