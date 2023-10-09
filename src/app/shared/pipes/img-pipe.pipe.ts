import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  private httpClient = inject(HttpClient);

   transform(imagen: string, tipoImagen: string = 'usuario') {
    console.log('pipe');
    // console.log(imagen);
    let url = `${environment.baseUrl}`;

    // console.log('here pipe -------->', {imagen});
    if (!imagen) {
      return `${url}/auth/userImage/dsds`;
    }

    if (tipoImagen == 'usuario') {
      // console.log('pipe', JSON.parse(localStorage.getItem('userLoged')));
      // const img = JSON.parse(localStorage.getItem('userLoged'));
      // console.log(img.img);
      // const url2 = `${url}/auth/userImage/${imagen}`
      // this.miMetodoPersonalizado(url2)
      // return url = `${url}/auth/userImage/${imagen}`;
      return this.miMetodoPersonalizado(imagen)
    }

    // else if (tipoImagen === 'estudiante') {
    //     url = `${url}/estudiante/${imagen}`;
    //   } else {
    //    url = `${url}/usuario/xxx`;
    //   }

    return url;
  }


  private miMetodoPersonalizado(valor: any) {
    // Realiza lógica personalizada aquí
    return `${environment.baseUrl}/auth/userImage/${valor}`
  }

}
