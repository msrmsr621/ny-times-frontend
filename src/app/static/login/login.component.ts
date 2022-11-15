import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GeneralServices } from 'src/app/services/general.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  hide = true;

  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralServices,
    private spinner: NgxSpinnerService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    public router: Router,) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]
        ],
      },
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    console.log("1")
    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));

    const form_obj = this.form.getRawValue();
    const reuqest_data = form_obj;
    this.spinner.show();
    this.generalService.login(reuqest_data).then((response) => {
      this.spinner.hide();
      if (response != undefined) {
        this.tokenStorage.saveToken(response['access_token']);
        // this.toastr.success('Dashboard', 'Welcome to dashboard');
        this.router.navigate(["articles"]);
      }

    }).catch(response => {
      this.spinner.hide();
    });

  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

}
