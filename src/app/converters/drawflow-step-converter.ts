import { StepConnectorEntity } from "@app/entities/step-connector.entity";
import { StepEntity } from "@app/entities/step.entity";
import { Dictionary } from "@app/models/dictionary";
import { DrawFlowInputConnectorModel, DrawFlowOutputConnectorModel, DrawFlowStepModel, DrawFlowInputConnectionModel, DrawFlowOutputConnectionModel } from "@app/models/drawflow-package-model";

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
            html: data.html,
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
    static toExtendedModel(data: StepEntity|any,index: number): DrawFlowStepModel{
        if(!("positionX" in data)){
            return {
                _id: data.id,
                id: index,
                name: data.name,
                description: data.description ?? "",
                data: data.data ?? {},
                action: data.action ?? "",
                class: data.class ?? data.name,
                html: data.html ?? "",
                inputs: data.inputs,
                outputs: data.outputs,
                pos_x: data.pos_x,
                pos_y: data.pos_y,
                typenode: "false"
            }
        }
        const inputs: Dictionary<DrawFlowInputConnectorModel> = {};
        const outputs: Dictionary<DrawFlowOutputConnectorModel> = {};
        data.inputs.forEach((item:any,index:number)=>{
            const connections: DrawFlowInputConnectionModel[] = item.connections.map((item:any)=>({input: item.connectorId,node: item.stepId}));
            inputs[`input_${index}`] = {
                connections: connections
            };
        })
        data.outputs.forEach((item:any,index:number)=>{
            const connections: DrawFlowOutputConnectionModel[] = item.connections.map((item:any)=>({output: item.connectorId,node: item.stepId}));
            outputs[`output_${index}`] = {
                connections: connections
            };
        })
        return {
            _id: data.id,
            id: index,
            name: data.name,
            description: data.description ?? "",
            data: data.variables ?? {},
            action: data.action ?? "",
            class: data.class ?? data.name,
            html: data.html ?? "",
            inputs: inputs,
            outputs: outputs,
            pos_x: data.positionX,
            pos_y: data.positionY,
            typenode: "false"
        }        
    }
    static toNativeStepModel(data: DrawFlowStepModel): any{
        return {
            "id": data.id,
            "name": data.name,
            "data": data.data ?? {},
            "class": data.class ?? data.name,
            "html": data.html ?? "",
            "typenode": data.typenode ?? false,
            "inputs": data.inputs,
            "outputs": data.outputs,
            "pos_x": data.pos_x,
            "pos_y": data.pos_y
          }
    }
}