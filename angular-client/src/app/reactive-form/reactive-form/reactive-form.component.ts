import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  modelForm = new FormGroup({
    model: new FormControl('', [Validators.required,]),
  });

  outputForm = new FormGroup({
    component: new FormControl(''),
    template: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  //next remove the last item from modelArray because it is undefined..

  onGenerate() {
    this.generateFromGroup();
  }

  private generateFromGroup() {
    let modelDivider = '{ get; set; }'.replace(/\s+/g, '');
    let model = this.modelForm.controls.model.value;
    let modelArray = model
      .replace(/\s+/g, '')
      .replace(/\r?\n|\r/g, '')
      .split(modelDivider);
    //console.log(modelArray);
    let formControlArray = [];
    // delete last item from modelArray because it is undefined..
    modelArray.pop();
    //for each fields....
    modelArray.forEach((field) => {
      //console.log(field);
      //separete validation attribute..
      let validations: string = field.split('public')[0];
      console.log(validations);
      // take the values inside [] check if the value is not empty..
      let validationArray = validations.match(/\[(.*?)\]/g);
      console.log(validationArray);
      //separete Type and propertyName...
      let propertyWithType = field.split('public')[1];
      //console.log(propertyWithType);
      // let name = propertyWithType.replace(/[A-Z][a-z]?\d*/,'-');
      //name Index...
      let match = propertyWithType.match(/[A-Z]\d*/);

      //property name
      let name = propertyWithType.slice(match.index);

      //property type
      let type = propertyWithType.split(/[A-Z]\d*/)[0];

      formControlArray.push(
        this.generateFormControl(type, name, validationArray)
      );
      // console.log(name);
      // console.log(type);
      // console.log(formControlArray);
    });

    //console.log(formControlArray);
    // formControlArray to string...
    let formControlString = formControlArray.join('\n');

    let formGroup =
      `formGroup = new FormGroup({` +
      '\n' +
      formControlString +
      '\n' +
      `     });`;

    this.outputForm.controls.component.setValue(formGroup);
  }

  generateFormControl(
    type: any,
    name: any,
    validationArray: RegExpMatchArray
  ): any {
    let formControl = '';
    if (validationArray) {
      let validations = this.getValidations(validationArray);
      formControl += `${name} : new FormControl('', [${validations}]),`;
    } else {
      formControl += `${name} : new FormControl(''),`;
    }
    return formControl;
  }

  private getValidations(validationArray: RegExpMatchArray): string {
    let validationString = '';
    validationArray.forEach((validation) => {
      // if validation contain [Required] add Validators.required to validationString...
      if (validation.includes('[Required]')) {
        validationString += 'Validators.required,';
      }
    });
    return validationString;
  }

}
