import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../shared/models/Contact';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{

  contactForm:FormGroup<any>;

  constructor(private contactService:ContactService,private formBuilder:FormBuilder){

  }

  ngOnInit(){
      this.contactForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        message:['',Validators.required],
        name:['',Validators.required]
      })

  }

  get fc() {
    return this.contactForm.controls;
  }

  onSubmit(){    
    console.log("done");
    
    if (this.contactForm.invalid) return;
    this.contactService.sendForm({name:this.fc.name.value,email:this.fc.email.value,message:this.fc.message.value}).subscribe(_ => {
      console.log(_)
    });
    

  }


}
