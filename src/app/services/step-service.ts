import { Injectable } from "@angular/core";
import { ComponentInfo } from "../types/component-info";

@Injectable({  providedIn: 'root'})
export class StepService {
    async list(): Promise<Array<ComponentInfo>>{
        const response = await fetch("http://localhost:3000/api/steps");
        const results = await response.json();
        return results.map((c: any)=> {
            const component: ComponentInfo = {
              id: c["_id"],
              name: c["name"],
              inputsCount: c["inputsCount"],
              outputsCount: c["outputsCount"]
            }
            return component;
          })
    }
}