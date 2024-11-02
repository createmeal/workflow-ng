import { DrawFlowStepModel } from "../models/drawflow-package-model";
import { DrawFlowStepConverter } from "./drawflow-step-converter";

describe('DrawFlowStepConverter',()=>{
    it('native to step entity', () => {
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
            "typenode": "vue",
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
        const result = DrawFlowStepConverter.toExtendedModel(nativeStep,1);
        expect(result).toBeTruthy();
      });
})