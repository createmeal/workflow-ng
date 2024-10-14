import { Injectable } from "@angular/core";
import { v4 as uuidv4} from "uuid";
import { download,upload } from "./file-service";

@Injectable({  providedIn: 'root'})
export class PackageService {
    export(jsonData: any){
        download(JSON.stringify(jsonData,null,2), `${uuidv4()}.json`, 'text/plain');
    }
    async import(event: any){
        const content = await upload(event.target.files[0]);
        return JSON.parse(content as string);
    }
}