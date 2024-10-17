import { Dictionary } from "./dictionary";

export interface DrawFlowInputConnectionModel {
    node: string,
    input: string
}
export interface DrawFlowOutputConnectionModel {
    node: string,
    output: string
}
export interface DrawFlowInputConnectorModel {
    connections: DrawFlowInputConnectionModel[]
}
export interface DrawFlowOutputConnectorModel {
    connections: DrawFlowOutputConnectionModel[]
}
export interface DrawFlowStepModel {
    _id: string,
    id: number,
    name: string,
    description: string,
    data: Dictionary<any>,
    action: any,
    class: string,
    html: string,
    typenode: string,
    inputs: Dictionary<DrawFlowInputConnectorModel>,
    outputs: Dictionary<DrawFlowOutputConnectorModel>,
    pos_x: number,
    pos_y: number
}
export interface DrawFlowPageModel {
    data: Dictionary<DrawFlowStepModel>
    name: string,
    description: string,
    variables: any,
    startStepId: string
}
export interface DrawFlowPackageModel {
    id: string,
    name: string,
    drawflow: Dictionary<DrawFlowPageModel>
    description: string,
    variables: any,
    startPageName: string
}