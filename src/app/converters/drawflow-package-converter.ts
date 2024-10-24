import { DrawflowExport } from "drawflow";
import { PackageEntity } from "../entities/package.entity";
import { PageEntity } from "../entities/page.entity";
import { DrawFlowPackageModel, DrawFlowPageModel } from "../models/drawflow-package-model";
import { Dictionary } from "../models/dictionary";
import { DrawFlowPageConverter } from "./drawflow-page-converter";

export class DrawFlowPackageConverter{
    static toExtendedModel(data: DrawflowExport | PackageEntity, defaultData: DrawFlowPackageModel | null=null): DrawFlowPackageModel{
        const pages: Dictionary<DrawFlowPageModel> = {};
        if("drawflow" in data){
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
        data.pages.forEach(valuePage=>pages[valuePage.name] = DrawFlowPageConverter.toExtendedModel(valuePage));

        return {
            id: data.id,
            name: data.name,
            description: data.description,
            drawflow: pages,
            startPageName: data.startPageName,
            variables: data.variables
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
        const pages: PageEntity[] = Object.entries(data.drawflow).map((value)=>{
            const page = DrawFlowPageConverter.toPageEntity(value[1]);
            page.name = value[0];
            return page;
        });
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            variables: data.variables,
            pages: pages,
            startPageName: data.startPageName,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}