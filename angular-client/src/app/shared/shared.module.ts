import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CheckboxInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SharedModule {}
