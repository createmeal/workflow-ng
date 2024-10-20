import { Dictionary } from "../models/dictionary"
import { PackageEntity } from "./package.entity"
export interface ExecutionEntity {
    package: PackageEntity,
    status: any,
    createdAt: Date,
  }
  export interface ExecutionDefaultStartEntity {
    packageId: string
  }
  export interface ExecutionStartEntity {
    packageId: string,
    startPageName: string|unknown,
    startStepId: string|unknown,
    variables: Dictionary<any>
  }