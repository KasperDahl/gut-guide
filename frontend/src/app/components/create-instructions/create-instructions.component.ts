import { Component } from '@angular/core';

@Component({
  selector: 'app-create-instructions',
  standalone: true,
  imports: [],
  templateUrl: './create-instructions.component.html',
  styleUrl: './create-instructions.component.scss'
})
export class CreateInstructionsComponent {

}



// export class RecipeInstructionsComponent implements OnInit {
//   instructionsForm: FormGroup;
  
//   constructor(private fb: FormBuilder) {
//     this.instructionsForm = this.fb.group({
//       steps: this.fb.array([])
//     });
//   }
  
//   ngOnInit() {
//     this.addStep(); // Add the initial step
//   }
  
//   get steps() {
//     return this.instructionsForm.get('steps') as FormArray;
//   }
  
//   createStep() {
//     return this.fb.group({
//       instruction: [''],
//       isReadonly: [false]
//     });
//   }
  
//   addStep() {
//     this.steps.push(this.createStep());
//   }
  
//   addStepAfter(index: number) {
//     const currentStep = this.steps.at(index);
//     if (currentStep.get('instruction')?.value) {
//       currentStep.patchValue({ isReadonly: true });
//       this.steps.insert(index + 1, this.createStep());
//     }
//   }
  
//   editStep(index: number) {
//     const step = this.steps.at(index);
//     step.patchValue({ isReadonly: false });
//   }
  
//   deleteStep(index: number) {
//     this.steps.removeAt(index);
//   }
//   }
