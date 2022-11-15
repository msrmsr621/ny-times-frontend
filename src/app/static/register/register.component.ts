import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { GeneralServices } from 'src/app/services/general.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  hide = true;

  constructor(private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private generalService: GeneralServices,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    public router: Router,) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.match('password', 'confirmPassword')]
      }
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const form_obj = this.form.getRawValue();
    const reuqest_data = form_obj;
    this.spinner.show();
    this.generalService.register(reuqest_data).then((response) => {
      this.spinner.hide();
      console.log("response ", response)
      if (response != undefined) {
        this.toastr.success('SUCCESS', 'Created account successfully');
        this.router.navigate(["login"]);
      }

    }).catch(response => {
      this.spinner.hide();
    });

  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors.matching) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

}
