import { Injectable } from "@angular/core";
import { StepEntity } from "../entities/step.entity";

@Injectable({  providedIn: 'root'})
export class StepService {
    async list(): Promise<Array<StepEntity>>{
        const response = await fetch("http://localhost:3000/api/steps");
        return await response.json();
    }
}