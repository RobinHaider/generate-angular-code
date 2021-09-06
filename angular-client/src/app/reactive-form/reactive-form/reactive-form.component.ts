import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  

  modelForm = new FormGroup({
    model: new FormControl('', Validators.required),
  });

  outputForm = new FormGroup({
    component: new FormControl(''),
    template: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  //next remove the last item from modelArray because it is undefined..

  onGenerate(){
    let modelDivider = "{ get; set; }".replace(/\s+/g, '');
    let model = this.modelForm.controls.model.value;
    let modelArray = model.replace(/\s+/g, '').replace(/\r?\n|\r/g,'').split(modelDivider);
     console.log(modelArray);

    let formGroup = "formGroup = new FormGroup({   });";
    let formControlArray = [];
    //for each fields....
    modelArray.forEach(field => {
      //separete validation attribute..
      let validations = field.split('public')[0];
      //separete Type and propertyName...
      let propertyWithType = field.split('public')[1]; 
       console.log(propertyWithType);
      // let name = propertyWithType.replace(/[A-Z][a-z]?\d*/,'-');
      
      //name Index...
      let match = propertyWithType.match(/[A-Z]\d*/);

      //property name
      let name = propertyWithType.slice(match.index);

      //property type
      let type = propertyWithType.split(/[A-Z]\d*/)[0];

      formControlArray.push(this.generateFormControl(type,name));
      // console.log(name);
      // console.log(type);
      // console.log(formControlArray);
    });

    console.log(formControlArray);
    
    // this.outputForm.controls.component.setValue(model);

  }

  generateFormControl(type: string, name: string){

    return ` ${name}: new FormControl('', Validators.required),`;

  }


}
