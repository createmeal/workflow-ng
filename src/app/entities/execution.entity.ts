import { PackageEntity } from "./package.entity"
export interface ExecutionEntity {
    package: PackageEntity,
    status: any,
    createdAt: Date,
  }