import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageEntityDataSource } from './packages-page.component';
import { PackagesPageComponent } from './packages-page.component';

const ELEMENT_DATA: PackageEntityDataSource[] = [
  {
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
      imports: [PackagesPageComponent]
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
