import { Injectable } from "@angular/core";
import { StepEntity } from "../entities/step.entity";

@Injectable({  providedIn: 'root'})
export class StepService {
    async list(page: number=1, pageSize: number=50): Promise<Array<StepEntity>>{
        const response = await fetch(`http://localhost:3000/api/steps?page=${page}&pageSize=${pageSize}`);
        return await response.json();
    }
}