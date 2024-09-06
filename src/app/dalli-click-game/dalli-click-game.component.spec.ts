import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DalliClickGameComponent } from './dalli-click-game.component';

describe('DalliClickGameComponent', () => {
  let component: DalliClickGameComponent;
  let fixture: ComponentFixture<DalliClickGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DalliClickGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DalliClickGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
