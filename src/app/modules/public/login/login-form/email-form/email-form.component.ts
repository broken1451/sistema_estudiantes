import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit, AfterViewChecked{

  @Output() validForm = new EventEmitter<boolean>();
  @Output() formValueEmail = new EventEmitter<any>();

  
  get formsValue() {
    return this.form.controls;
  }
  public form: FormGroup = this.fb.group({
    email: ['', [ Validators.pattern(/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,5})$/)]],
    password:['', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/)]],
    remember: ['', []],
  });


  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.formValueEmail.emit(this.form.value)
  }

  ngAfterViewChecked(): void {
    this.validForm.emit(this.form.invalid)
  }

  campoNoEsValido (campo: string): any {
    return this.form?.controls[campo]?.errors && (this.form?.controls[campo]?.touched || this.form?.controls[campo]?.errors?.['pattern']?.requiredPattern); 
  }

}
