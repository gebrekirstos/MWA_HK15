import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MyHttpService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = {
    name : '',
    email : '',
    post : ''
  }

  myForm : FormGroup;
  constructor(formBuilder : FormBuilder, private httpService : MyHttpService) {
    this.myForm = formBuilder.group(
      {
        'name' : ['', Validators.required],
        'email' : ['',[
                      Validators.required,
                      Validators.pattern("[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                  ]
                  ],
        'post' : ['', [
                Validators.required,
                Validators.minLength(10)
        ]]
      }
    );

    this.myForm.statusChanges.subscribe(
      (data : any) => console.log(data)
    );


  }

  onFormSubmit() {
    console.log(this.myForm.value);
  }

  onGetMyData() {
    this.httpService.getMyData('https://jsonplaceholder.typicode.com/users/1').subscribe(
      response => {
          var userObject = response.json();
          this.myForm.controls['name'].setValue(userObject.name, {onlySelf: true});
          this.myForm.controls['email'].setValue(userObject.email, {onlySelf: true});
          this.httpService.getMyData('https://jsonplaceholder.typicode.com/posts?userId=1').subscribe(
            innerResponse => {
              var firstPost = innerResponse.json()[0];
              this.myForm.controls['post'].setValue(firstPost.body);
            },
            innerError => console.log(innerError)
          );
      },
      error => console.log(error)
    );

  }
}
