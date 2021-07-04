import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPLoaderComponent } from './SPloader.component';

describe('LoaderComponent', () => {
  let component: SPLoaderComponent;
  let fixture: ComponentFixture<SPLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SPLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
