import { PageEntity } from "./page.entity"
export interface PackageEntity {
    name: string,
    description: string,
    pages: PageEntity[],
    startPageName: string,
    createdAt: Date,
    updatedAt: Date
  }