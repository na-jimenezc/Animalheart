import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMascota } from './item-mascota';

describe('ItemMascota', () => {
  let component: ItemMascota;
  let fixture: ComponentFixture<ItemMascota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMascota]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemMascota);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
