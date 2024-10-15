import { StepEntity } from "./step.entity";

export interface PageEntity {
    name: string,
    description: string,
    variables: any
    steps: StepEntity[],
    startStepName: string,
    createdAt: Date,
    updatedAt: Date
  }