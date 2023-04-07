import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighLowListComponent } from './high-low-list.component';

describe('HighLowListComponent', () => {
  let component: HighLowListComponent;
  let fixture: ComponentFixture<HighLowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighLowListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighLowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
