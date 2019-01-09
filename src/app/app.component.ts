import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  signupForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];
  submitted: boolean = false;
  forbiddenProjNames = ['Test'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'projName': new FormControl(null, [Validators.required], this.forbiddenProjectNames),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });

  }

  // forbiddenProjectNames = (control: FormControl): {[s: string]: boolean} => {
  //   if(this.forbiddenProjNames.includes(control.value)) {
  //     return ({'nameIsForbidden': true});
  //   }
  //   return null;
  // }

  forbiddenProjectNames = (control: FormControl): Promise<any> | Observable<any> => {
    const promise = new Promise((resolve, reject)=> {
      setTimeout(()=> {
        if(this.forbiddenProjNames.includes(control.value)) {
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log('form values: ', this.signupForm);
    //reset values
    this.submitted = true;
    setTimeout(()=> {
      this.signupForm.reset();
    }, 2000);
  }

}
