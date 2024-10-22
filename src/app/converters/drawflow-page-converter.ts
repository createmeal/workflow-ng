import { PageEntity } from "../entities/page.entity";
import { StepEntity } from "../entities/step.entity";
import { Dictionary } from "../models/dictionary";
import { DrawFlowPageModel } from "../models/drawflow-package-model";
import { DrawFlowStepConverter } from "./drawflow-step-converter";

export class DrawFlowPageConverter {
    static toPageEntity(data: DrawFlowPageModel): PageEntity{
        const steps: StepEntity[] = Object.entries(data.data).map((valueStep)=>DrawFlowStepConverter.toStepEntity(valueStep[1]));
        return {
            name: data.name,
            description: data.description,
            startStepId: data.startStepId,
            steps: steps,
            variables: data.variables,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
    static toExtendedModel(data: PageEntity): DrawFlowPageModel{
        const steps:Dictionary<any> = {};
        data.steps.forEach((item,index)=>{
            steps[index] = DrawFlowStepConverter.toExtendedModel(item,index);
        });
        return {
            data: steps,
            name: data.name,
            startStepId: data.startStepId,
            description: data.description,
            variables: data.variables
        }
    }
    static toNativePageModel(data: DrawFlowPageModel): any {
        const steps:Dictionary<any> = {};
        if("data" in data){
            Object.entries(data.data).forEach((valueStep)=>steps[valueStep[0]] = DrawFlowStepConverter.toNativeStepModel(valueStep[1]));
        }else {
            Object.entries(data).forEach((valueStep: any)=>steps[valueStep[0]] = DrawFlowStepConverter.toNativeStepModel(valueStep[1]));
        }
        return {
            data: steps
        }
    }
}