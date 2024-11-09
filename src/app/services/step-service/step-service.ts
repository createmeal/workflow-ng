import { Injectable } from "@angular/core";
import { StepEntity } from "@app/entities/step.entity";
import { config } from "@app/config";
@Injectable({  providedIn: 'root'})
export class StepService {
    async list(page: number=1, pageSize: number=50): Promise<Array<StepEntity>>{
        const response = await fetch(`${config.api.baseUrl}/api/steps?page=${page}&pageSize=${pageSize}`);
        return await response.json();
    }
}