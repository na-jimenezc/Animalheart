import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardService } from '../../../core/services/dashboard.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  beforeEach(async () => {
    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getDashboardData']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ]
    })
    .compileComponents();

    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
    
    //Mock de datos para las pruebas
    dashboardService.getDashboardData.and.returnValue(of({
      totalTratamientosUltimoMes: 0,
      tratamientosPorMedicamento: [],
      veterinariosActivos: 0,
      veterinariosInactivos: 0,
      totalMascotas: 0,
      mascotasActivas: 0,
      ventasTotales: 0,
      gananciasTotales: 0,
      top3Tratamientos: [],
      todosVeterinarios: []
    }));

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading true', () => {
    expect(component.loading).toBe(true);
  });

  it('should have empty dashboard data initially', () => {
    expect(component.dashboardData.totalTratamientosUltimoMes).toBe(0);
    expect(component.dashboardData.veterinariosActivos).toBe(0);
  });
});