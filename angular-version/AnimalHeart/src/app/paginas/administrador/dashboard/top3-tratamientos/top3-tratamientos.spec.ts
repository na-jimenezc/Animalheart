import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Top3Tratamientos } from './top3-tratamientos';

describe('Top3Tratamientos', () => {
  let component: Top3Tratamientos;
  let fixture: ComponentFixture<Top3Tratamientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top3Tratamientos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top3Tratamientos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});