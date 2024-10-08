import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAnfitrionComponent } from './menu-anfitrion.component';

describe('MenuAnfitrionComponent', () => {
  let component: MenuAnfitrionComponent;
  let fixture: ComponentFixture<MenuAnfitrionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAnfitrionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAnfitrionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
