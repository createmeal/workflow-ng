import { StepEntity } from "@app/entities/step.entity";
import { DrawFlowStepModel } from "@app/models/drawflow-package-model";
import { DrawFlowStepConverter } from "./drawflow-step-converter";

describe('DrawFlowStepConverter', () => {
  it('step native to extended model', () => {
    const nativeStep = {
      "id": 1,
      "name": "HttpRequestNode",
      "data": {
        "url": "https://dog-api.kinduff.com/api/facts",
        "method": "GET",
        "outputStatus": "http_status",
        "outputContentType": "http_contenttype",
        "outputContent": "http_content"
      },
      "class": "HttpRequestNode",
      "html": "HttpRequestNode",
      "typenode": "false",
      "inputs": {},
      "outputs": {
        "output_1": {
          "connections": [
            {
              "node": "2",
              "output": "input_1"
            }
          ]
        }
      },
      "pos_x": 137,
      "pos_y": 89
    };
    const result = DrawFlowStepConverter.toExtendedModel(nativeStep, 1);
    expect(result).toBeTruthy();
    expect(result.data).toEqual(nativeStep.data);
    expect(result.inputs).toEqual(nativeStep.inputs);
    expect(result.outputs).toEqual(nativeStep.outputs);
  });

  it('step extend to native model', () => {
    const extendeModel: DrawFlowStepModel = {
      "_id": "asdf",
      "id": 1,
      "name": "HttpRequestNode",
      "description": "description",
      "action": "",
      "data": {
        "url": "https://dog-api.kinduff.com/api/facts",
        "method": "GET",
        "outputStatus": "http_status",
        "outputContentType": "http_contenttype",
        "outputContent": "http_content"
      },
      "class": "HttpRequestNode",
      "html": "HttpRequestNode",
      "typenode": "false",
      "inputs": {},
      "outputs": {
        "output_1": {
          "connections": [
            {
              "node": "2",
              "output": "input_1"
            }
          ]
        }
      },
      "pos_x": 137,
      "pos_y": 89
    };
    const result = DrawFlowStepConverter.toNativeStepModel(extendeModel);
    expect(result).toBeTruthy();
    expect(result.data).toEqual(extendeModel.data);
    expect(result.inputs).toEqual(extendeModel.inputs);
    expect(result.outputs).toEqual(extendeModel.outputs);
  });
  it('step extend model to step entity', () => {
    const extendeModel: DrawFlowStepModel = {
      "_id": "asdf",
      "id": 1,
      "name": "HttpRequestNode",
      "description": "description",
      "action": "",
      "data": {
        "url": "https://dog-api.kinduff.com/api/facts",
        "method": "GET",
        "outputStatus": "http_status",
        "outputContentType": "http_contenttype",
        "outputContent": "http_content"
      },
      "class": "HttpRequestNode",
      "html": "HttpRequestNode",
      "typenode": "false",
      "inputs": {
        "input_1": {
          "connections": [
            {
              "node": "1",
              "input": "output_1"
            }
          ]
        }
      },
      "outputs": {
        "output_1": {
          "connections": [
            {
              "node": "2",
              "output": "input_1"
            }
          ]
        }
      },
      "pos_x": 137,
      "pos_y": 89
    };
    const result = DrawFlowStepConverter.toNativeStepModel(extendeModel);
    expect(result).toBeTruthy();
  });
  it('step entity to step extend model', () => {
    const stepEntity: StepEntity = {
      id: "asdf",
      "name": "HttpRequestNode",
      "description": "description",
      action: undefined,
      "variables": {
        "url": "https://dog-api.kinduff.com/api/facts",
        "method": "GET",
        "outputStatus": "http_status",
        "outputContentType": "http_contenttype",
        "outputContent": "http_content"
      },
      "class": "HttpRequestNode",
      "html": "HttpRequestNode",
      createdAt: new Date(),
      updatedAt: new Date(),
      inputsCount: 1,
      outputsCount: 1,
      "inputs": [{
        connections: [
          {
            stepId: "qwerty",
            connectorId: "asdf"
          }
        ]
      }],
      "outputs": [{
        connections: [
          {
            stepId: "asdf",
            connectorId: "qwerty"
          }
        ]
      }],
      "positionX": 137,
      "positionY": 89
    }
    const result = DrawFlowStepConverter.toExtendedModel(stepEntity, 1);
    expect(result).toBeTruthy();
  });
})