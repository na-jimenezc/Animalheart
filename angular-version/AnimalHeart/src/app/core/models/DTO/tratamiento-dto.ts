import { MedicamentoDTO} from "./medicamento-dto";
import { VeterinarioDTO } from "./veterinario.dto";

export interface TratamientoDTO {
  id?: number;
  fecha: string;
  cantidadUsada: number;
  medicamento: MedicamentoDTO;
  veterinario: VeterinarioDTO;
}