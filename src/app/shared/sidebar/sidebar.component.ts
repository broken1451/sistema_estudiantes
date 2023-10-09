import { ApplicationRef, ChangeDetectorRef, Component, DoCheck, NgZone, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu, User } from 'src/app/modules/public/interfaces/login.interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';
import { ImagenPipe } from '../pipes/img-pipe.pipe';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, DoCheck {

  public usuario!: any;
  // public readonly userService = inject(AuthService);
  private readonly imgPipe = inject(ImagenPipe);
  public menu!: Menu[];
  public usuario$!: Subscription;
  public user$: Subscription;

  constructor(private userService: AuthService, 
    private appRef: ApplicationRef, 
    private ngZone: NgZone, 
    private ChangeDetectorRef: ChangeDetectorRef) {
    this.usuario =  JSON.parse(localStorage.getItem('userLoged')!)
  }
  
  ngDoCheck(): void {
  //  this.usuario =  JSON.parse(localStorage.getItem('userLoged')!)
    //  this.imgPipe.transform(this.usuario.img);
  }


  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('userLoged')!);
    console.log(this.usuario);
    this.menu = JSON.parse(localStorage.getItem('menu')!);
              // this.appRef.tick();
        // })

        // window.location.reload();
        // this.ChangeDetectorRef.detectChanges()
    // this.user$ = this.userService.itemsObservable$.subscribe({
    //   next: (data) => {
    //     console.log(data);
  
    //     this.userService.getUserImage(data.img).subscribe(
    //       (blobData) => {
    //         // Handle the received blob data, e.g., display the image
    //         const imageUrl = URL.createObjectURL(blobData).split('/')[3];
    //         console.log({imageUrl});
    //         this.usuario.img = imageUrl
    //         this.imgPipe.transform(imageUrl);
    //         // Use imageUrl to display the image in your template
    //       },
    //       (error) => {
    //         // Handle errors if any
    //       }
    //     );
  
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    //   complete: () => {
    //     console.info('Success login.');
    //   },
    // });
  }


  logout(){
    this.userService.logout();
    this.usuario = null;;
  }
}
