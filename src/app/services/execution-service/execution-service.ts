import { Injectable } from "@angular/core";
import { ExecutionDefaultStartEntity, ExecutionEntity, ExecutionStartEntity } from "@app/entities/execution.entity";
import { config } from "@app/config";
@Injectable({ providedIn: 'root' })
export class ExecutionService {
    async list(page: number=1, pageSize: number=50): Promise<Array<ExecutionEntity>>{
        const requestOptions: any = {
            method: "GET",
            redirect: "follow"
          };
          
          const response = await fetch(`${config.api.baseUrl}/api/executions?page=${page}&pageSize=${pageSize}`, requestOptions);
          return await response.json();
    }
    async start(data: ExecutionStartEntity|ExecutionDefaultStartEntity) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow"
        };
        const response = await fetch(`${config.api.baseUrl}/api/executions`, requestOptions);
        return await response.json();
    }
}