# generate-angular-code
Automatically generate reactive form code for both TS and html file from C# or any other model

Our First Goal is to convert any C# Model To Angular Reactive Form both TS and HTML.

Steps....

1. Seperate  every field/property by regx or other way
2. Need To distinguish the model name, type any validation through regx or other way if any
3. Depending on those need to generate Form Group and Form Control
4. And Generate HTML Inputs based on that Form Group

Easy peasy lemon squeezy
Happy Coding..

Example...
C# Model.....

 [Required]
 public string Email { get; set; }
 [Required]
 public string Password { get; set; }

Angular Component...

 loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

HTML Template...

 <div class="d-flex justify-content-center mt-5">
    <div class="col-3">
        <form [formGroup]="loginForm"  class="form-signin">
            <div class="text-center mb-4">
              <h1 class="h3 mb-3 font-weight-normal">Form Title</h1>
            </div>
          
            <div class="form-label-group">
              <input formControlName="email" type="email" id="inputEmail" class="form-control" placeholder="Email address">
              <label for="inputEmail">Email</label>
            </div>
          
            <div class="form-label-group">
              <input formControlName="password" type="password" id="password" class="form-control" placeholder="Password" >
              <label for="password">Password</label>
            </div>
          
        
            <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
          </form>
    </div>
</div>
