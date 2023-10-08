import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(imagen: string, tipoImagen: string = 'usuario') {
    console.log(imagen);
    let url = `${environment.baseUrl}`;

    // console.log('here pipe -------->', {imagen});
    if (!imagen) {
      return `${url}/auth/userImage/dsds`;
    }

    if (tipoImagen == 'usuario') {
      console.log('pipe');
      return url = `${url}/auth/userImage/${imagen}`;
    }

    // else if (tipoImagen === 'estudiante') {
    //     url = `${url}/estudiante/${imagen}`;
    //   } else {
    //    url = `${url}/usuario/xxx`;
    //   }

    return url;
  }
}
