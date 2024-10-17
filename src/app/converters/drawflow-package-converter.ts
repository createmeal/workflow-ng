import Drawflow, { DrawflowExport } from "drawflow";
import { PackageEntity } from "../entities/package.entity";
import { PageEntity } from "../entities/page.entity";
import { StepConnectorEntity } from "../entities/step-connector.entity";
import { StepEntity } from "../entities/step.entity";
import { DrawFlowInputConnectorModel, DrawFlowOutputConnectorModel, DrawFlowPackageModel, DrawFlowPageModel, DrawFlowStepModel } from "../models/drawflow-package-model";
import { Dictionary } from "../models/dictionary";

export class DrawFlowInputConnectorConverter{
    static toStepConnectorEntity(data: DrawFlowInputConnectorModel): StepConnectorEntity{
        return {
            connections: data.connections.map(connection=> ({connectorId: connection.input, stepId: connection.node}))
        }
    }
}
export class DrawFlowOutputConnectorConverter{
    static toStepConnectorEntity(data: DrawFlowOutputConnectorModel): StepConnectorEntity{
        return {
            connections: data.connections.map(connection=> ({connectorId: connection.output, stepId: connection.node}))
        }
    }
}
export class DrawFlowStepConverter {
    static toStepEntity(data: DrawFlowStepModel): StepEntity{
        return {
            id: data._id,
            name: data.name,
            description: data.description,
            variables: data.data,
            class: data.class,
            action: data.action,
            inputsCount: 0,
            outputsCount: 0,
            inputs: Object.entries(data.inputs).map(valueInput=>DrawFlowInputConnectorConverter.toStepConnectorEntity(valueInput[1])),
            outputs: Object.entries(data.outputs).map(valueOutput=>DrawFlowOutputConnectorConverter.toStepConnectorEntity(valueOutput[1])),
            positionX: data.pos_x,
            positionY: data.pos_y,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
    static toNativeStepModel(data: DrawFlowStepModel): any{
        return {
            "id": data.id,
            "name": data.name,
            "data": data.data,
            "class": data.class,
            "html": data.html,
            "typenode": data.typenode,
            "inputs": data.inputs,
            "outputs": data.outputs,
            "pos_x": data.pos_x,
            "pos_y": data.pos_y
          }
    }
}
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
    static toNativePageModel(data: DrawFlowPageModel): any {
        const steps:Dictionary<any> = {};
        Object.entries(data).forEach((valueStep)=>steps[valueStep[0]] = DrawFlowStepConverter.toNativeStepModel(valueStep[1]));
        return {
            data: steps
        }
    }
}
export class DrawFlowPackageConverter{
    static toExtendedModel(data: DrawflowExport, defaultData: DrawFlowPackageModel | null=null): DrawFlowPackageModel{
        const pages: Dictionary<DrawFlowPageModel> = {};
        Object.entries(data.drawflow).forEach(valuePage=>pages[valuePage[0]] = JSON.parse(JSON.stringify(valuePage[1].data)));
        return {
            id: defaultData?.id ?? "",
            name: defaultData?.name ?? "",
            description: defaultData?.description ?? "",
            drawflow: pages,
            startPageName: Object.keys(data.drawflow)[0],
            variables: defaultData?.variables ?? {}
        }
    }
    static toNativeModel(data: DrawFlowPackageModel): DrawflowExport{
        
        const model: DrawflowExport = {
            drawflow: {
                Home: {
                    data: {}
                }
            }
        };
        Object.entries(data.drawflow).forEach((valuePage)=>{
            model.drawflow[valuePage[0]] = DrawFlowPageConverter.toNativePageModel(valuePage[1]);
        });
        return model;
    }
    static toPackageEntity(data: DrawFlowPackageModel | DrawflowExport): PackageEntity{
        if(!("name" in data)){
            data = this.toExtendedModel(data);
        }
        const pages: PageEntity[] = Object.entries(data.drawflow).map((value)=>DrawFlowPageConverter.toPageEntity(value[1]));
        return {
            name: data.name,
            description: data.description,
            pages: pages,
            startPageName: data.startPageName,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}