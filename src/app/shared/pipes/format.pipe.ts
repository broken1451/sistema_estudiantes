import { Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'formatRut'
})
export class FormatRutPipe implements PipeTransform {
  transform(rut?: string): any {
    if (!!rut) {
      let rutNuevo: string;
      rut = rut?.replace(/\./g, '')?.replace('-', '');
      rutNuevo = rut?.slice(-4, -1) + '-' + rut?.substr(rut?.length - 1);
      for (let i = 4; i < rut.length; i += 3) {
        rutNuevo = rut?.slice(-3 - i, -i) + '.' + rutNuevo;
      }
      return rutNuevo;
    } else {
      return '' ;
    }
  }
}
