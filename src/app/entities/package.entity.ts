import { Dictionary } from "../models/dictionary"
import { PageEntity } from "./page.entity"
export interface PackageEntity {
    id: string,
    name: string,
    description: string,
    pages: PageEntity[],
    variables: Dictionary<any>,
    startPageName: string,
    createdAt: Date,
    updatedAt: Date
  }