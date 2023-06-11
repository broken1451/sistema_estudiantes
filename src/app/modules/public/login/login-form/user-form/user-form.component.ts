import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, AfterViewChecked {

  @Output() validFormUser = new EventEmitter<boolean>();
  @Output() formValueUser = new EventEmitter<any>();
  private readonly authService = inject(AuthService);

  public form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
    password:['', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/)]],
    remember: ['', []],
  });


  constructor(private fb: FormBuilder, private cdRef:ChangeDetectorRef) { 
    
  }

  ngAfterViewChecked(): void {
    this.validFormUser.emit(this.form.invalid)
  }

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.form.patchValue({
        username: localStorage.getItem('username')!,
        remember: true
      });
    } else {
      this.form.patchValue({
        username: '',
        remember: false
      });
    }
  }

  onSubmit() {
    this.formValueUser.emit(this.form.value)
  }

  campoNoEsValido (campo: string): any {
    return this.form?.controls[campo]?.errors && (this.form?.controls[campo]?.touched || this.form?.controls[campo]?.errors?.['pattern']?.requiredPattern); 
  }

  goToRegister(){
    this.authService.goToRegister();
  }

}
