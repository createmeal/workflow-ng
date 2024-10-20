import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import { download, upload } from "./file-service";
import { DrawFlowPackageModel } from "../models/drawflow-package-model";
import { DrawFlowPackageConverter } from "../converters/drawflow-package-converter";
import { PackageEntity } from "../entities/package.entity";

const packages: PackageEntity[] = [];
const store = {
    packages: packages
}

@Injectable({ providedIn: 'root' })
export class PackageService {
    export(data: DrawFlowPackageModel) {
        download(JSON.stringify(data, null, 2), `${uuidv4()}.json`, 'text/plain');
    }
    async get(id: string): Promise<PackageEntity>{
        const match = store.packages.find((item: PackageEntity)=>item.id === id);
        if(match) return match;
        const requestOptions: any = {
            method: "GET",
            redirect: "follow"
          };
          
          const response = await fetch(`http://localhost:3000/api/packages/${id}`, requestOptions);
          const packageEntity:PackageEntity = await response.json();
          store.packages.push(packageEntity);
          return packageEntity;
    }
    async list(page: number=1, pageSize: number=50): Promise<Array<PackageEntity>>{
        const requestOptions: any = {
            method: "GET",
            redirect: "follow"
          };
          
          const response = await fetch(`http://localhost:3000/api/packages?page=${page}&pageSize=${pageSize}`, requestOptions);
          store.packages = await response.json();
          return store.packages;
    }
    async import(event: Event): Promise<DrawFlowPackageModel> {
        const input: HTMLInputElement|null = event.target as HTMLInputElement;
        if(!input){
            throw Error("File input not found");
        }
        const files:FileList|null = input.files;
        if(files && (files.length??0)>0){
            const content = await upload(files[0]);
            const data:DrawFlowPackageModel = JSON.parse(content as string);
            return data;
        }
        throw Error("File not found");
    }
    async save(data: DrawFlowPackageModel) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const method = data.id ? "PUT" : "POST";
        const url = data.id ? `http://localhost:3000/api/packages/${data.id}` : `http://localhost:3000/api/packages`;

        const requestOptions: any = {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(DrawFlowPackageConverter.toPackageEntity(data)),
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
          
        const response = await fetch(`http://localhost:3000/api/packages/${id}`, requestOptions);
        const packageEntity:PackageEntity = await response.json();
          
        store.packages = store.packages.filter((item: PackageEntity)=>item.id !== id);
        return packageEntity;
    }
}