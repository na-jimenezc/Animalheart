import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMascotaDetalle } from './cliente-mascota-detalle';

describe('ClienteMascotaDetalle', () => {
  let component: ClienteMascotaDetalle;
  let fixture: ComponentFixture<ClienteMascotaDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteMascotaDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteMascotaDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
