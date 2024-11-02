import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageEntityDataSource } from './packages-page.component';
import { PackagesPageComponent } from './packages-page.component';
import { appConfig } from '../../app.config';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

const ELEMENT_DATA: PackageEntityDataSource[] = [
  {
    id: "asdf",
    variables: {},
    name: "package name",
    description: "package description",
    pages: [],
    startPageName: "start-page",
    createdAt: new Date(),
    updatedAt: new Date(),
    actions: [{
      name: "Play",
      icon: "play_arrow",
      color: ""
    },{
      name: "Edit",
      icon: "edit",
      color: "accent"
    },{
      name: "Delete",
      icon: "delete",
      color: "warn"
    }]
  }
];

describe('PackagesPageComponent', () => {
  let component: PackagesPageComponent;
  let fixture: ComponentFixture<PackagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesPageComponent],
      providers: [...appConfig.providers,[provideRouter(routes)]]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
