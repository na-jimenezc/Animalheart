import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVet } from './header-vet';

describe('HeaderVet', () => {
  let component: HeaderVet;
  let fixture: ComponentFixture<HeaderVet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderVet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderVet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
