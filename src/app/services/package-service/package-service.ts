import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import { FileService } from "@app/services/file-service/file-service";
import { DrawFlowPackageModel } from "@app/models/drawflow-package-model";
import { PackageEntity } from "@app/entities/package.entity";
import { config } from "@app/config";
const packages: PackageEntity[] = [];
const store = {
    packages: packages
}

@Injectable({ providedIn: 'root' })
export class PackageService {
    fileService: FileService;
    constructor(){
        this.fileService = new FileService();
    }
    export(data: DrawFlowPackageModel) {
        this.fileService.download(JSON.stringify(data, null, 2), `${uuidv4()}.json`, 'text/plain');
    }
    async get(id: string): Promise<PackageEntity>{
        const match = store.packages.find((item: PackageEntity)=>item.id === id);
        if(match) return match;
        const requestOptions: any = {
            method: "GET",
            redirect: "follow"
          };
          
          const response = await fetch(`${config.api.baseUrl}/api/packages/${id}`, requestOptions);
          const packageEntity:PackageEntity = await response.json();
          store.packages.push(packageEntity);
          return packageEntity;
    }
    async list(page: number=1, pageSize: number=50): Promise<Array<PackageEntity>>{
        const requestOptions: any = {
            method: "GET",
            redirect: "follow"
          };
          
          const response = await fetch(`${config.api.baseUrl}/api/packages?page=${page}&pageSize=${pageSize}`, requestOptions);
          store.packages = await response.json();
          return store.packages;
    }
    async import(event: Event): Promise<DrawFlowPackageModel> {
        const content = await this.fileService.handleUpload(event);
        return JSON.parse(content as string);
    }
    async save(data: PackageEntity): Promise<PackageEntity> {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const method = data.id ? "PUT" : "POST";
        const url = data.id ? `${config.api.baseUrl}/api/packages/${data.id}` : `${config.api.baseUrl}/api/packages`;

        const requestOptions: any = {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow"
        };
        const response = await fetch(url, requestOptions);
        return await response.json();
    }
    async delete(id: string){
        const requestOptions: any = {
            method: "DELETE",
            redirect: "follow"
        };
          
        const response = await fetch(`${config.api.baseUrl}/api/packages/${id}`, requestOptions);
        const packageEntity:PackageEntity = await response.json();
          
        store.packages = store.packages.filter((item: PackageEntity)=>item.id !== id);
        return packageEntity;
    }
}