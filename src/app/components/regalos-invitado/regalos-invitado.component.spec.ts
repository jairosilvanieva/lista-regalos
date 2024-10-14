import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegalosInvitadoComponent } from './regalos-invitado.component';

describe('RegalosInvitadoComponent', () => {
  let component: RegalosInvitadoComponent;
  let fixture: ComponentFixture<RegalosInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegalosInvitadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegalosInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
