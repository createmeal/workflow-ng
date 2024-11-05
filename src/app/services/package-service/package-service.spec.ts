import { PackageEntity } from "@app/entities/package.entity";
import { PackageService } from "./package-service";

function createFetch<T>(expected:T){
    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(expected),
        }),
      ) as jest.Mock;
}
describe('PackageService', () => {
  let packageService: PackageService
    beforeEach(()=>{
        packageService = new PackageService();
    })
  it('list packages', async () => {
    const expected = [{
        id: "id",
        name:"name",
        description: "description",
        variables: [],
        pages:[{
            name:"page",
            description: "page-description",
            startStepId: "startStepId",
            variables: [],
            steps: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }],
        startPageName:"Home",
        createdAt: new Date(),
        updatedAt: new Date()
    }]
    createFetch<PackageEntity[]>(expected);
    const result = await packageService.list(1,10);
    expect(result.length).toEqual(expected.length);
    expect(result[0].id).toEqual(expected[0].id);
  });
  it('get package',async ()=>{
    const expected = {
        id: "id",
        name:"name",
        description: "description",
        variables: [],
        pages:[{
            name:"page",
            description: "page-description",
            startStepId: "startStepId",
            variables: [],
            steps: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }],
        startPageName:"Home",
        createdAt: new Date(),
        updatedAt: new Date()
    }
    createFetch<PackageEntity>(expected);
    const result = await packageService.get("id");
    expect(result.id).toEqual(expected.id);
  })
  it('delete package',async ()=>{
    const expected = {
        id: "id",
        name:"name",
        description: "description",
        variables: [],
        pages:[{
            name:"page",
            description: "page-description",
            startStepId: "startStepId",
            variables: [],
            steps: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }],
        startPageName:"Home",
        createdAt: new Date(),
        updatedAt: new Date()
    }
    createFetch<PackageEntity>(expected);
    const result = await packageService.delete("id");
    expect(result.id).toEqual(expected.id);
  })
  it('save package',async ()=>{
    const expected = {
        id: "id",
        name:"name",
        description: "description",
        variables: [],
        pages:[{
            name:"page",
            description: "page-description",
            startStepId: "startStepId",
            variables: [],
            steps: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }],
        startPageName:"Home",
        createdAt: new Date(),
        updatedAt: new Date()
    }
    createFetch<PackageEntity>(expected);
    const result = await packageService.save(expected);
    expect(result.id).toEqual(expected.id);
  })
})