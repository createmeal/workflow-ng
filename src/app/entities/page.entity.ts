import { StepEntity } from "./step.entity";

export interface PageEntity {
    name: string,
    description: string,
    variables: any
    steps: StepEntity[],
    startStepId: string,
    createdAt: Date,
    updatedAt: Date
  }