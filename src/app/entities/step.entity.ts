import { StepConnectorEntity } from "./step-connector.entity";
import { ActionEntity } from "./action.entity";
export interface StepEntity {
    id: string,
    name: string,
    description: string,
    action: ActionEntity | undefined,
    variables: any
    inputsCount: number,
    outputsCount: number,
    inputs:  StepConnectorEntity[],
    outputs:  StepConnectorEntity[],
    createdAt: Date,
    updatedAt: Date,
    positionX: number,
    positionY: number
  }