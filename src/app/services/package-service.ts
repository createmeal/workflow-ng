import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import { download, upload } from "./file-service";

@Injectable({ providedIn: 'root' })
export class PackageService {
    export(jsonData: any) {
        download(JSON.stringify(jsonData, null, 2), `${uuidv4()}.json`, 'text/plain');
    }
    async import(event: any) {
        const content = await upload(event.target.files[0]);
        return JSON.parse(content as string);
    }
    async save(data: any) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const method = data["id"] ? "PUT" : "POST";
        const url = data["id"] ? `http://localhost:3000/api/packages/${data.id}` : `http://localhost:3000/api/packages`;

        const requestOptions: any = {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow"
        };
        const response = await fetch(url, requestOptions);
        return await response.json();
    }
}