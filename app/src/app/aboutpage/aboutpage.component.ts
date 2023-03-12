import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoachService } from '../services/coach.service';
import { Coach } from '../shared/models/Coach';

@Component({
  selector: 'app-aboutpage',
  templateUrl: './aboutpage.component.html',
  styleUrls: ['./aboutpage.component.css'],
  encapsulation:ViewEncapsulation.None
})

export class AboutpageComponent implements AfterViewInit,OnInit{


  @ViewChild('slidecontainer') slideContainer:ElementRef;
  @ViewChild('prevbtn') prevbtn:ElementRef;
  @ViewChild('nextbtn') nextbtn:ElementRef;


  coaches : Coach[] = new Array<Coach>;
  coach :Coach = new Coach();

  constructor(private coachService:CoachService){
    
  }


  ngOnInit(){
   
  }

  ngAfterViewInit(){
    
    this.coachService.getAll().subscribe((res:any)=> {
      this.coaches = res.data;
      setTimeout(()=>{
        if (this.coaches.length === 1){
          this.nextbtn.nativeElement.style.display = 'none';
          this.prevbtn.nativeElement.style.display = 'none';
        }
  
  
        this.slideContainer.nativeElement.innerHTML = this.coaches
        .map((person, slideIndex) => {
          const { photo, name, text } = person
          let position = 'next'
          if (slideIndex === 0) {
            position = 'active'
          }
          if (slideIndex === this.coaches.length - 1) {
            position = 'last'
          }
          if (this.coaches.length <= 1) {
            position = 'active'
          }
          return `<article class="slide ${position}">
        <img src=${photo}  class="img" alt="${name}"/>
        <h4>${name}</h4>
      
        <p class="text">
         ${text}
        </p>
      <div class="quote-icon">
      <i class="fas fa-quote-right"></i>
      </div>
       </article>`
        })
        .join('')
  
  
      const startSlider = (type:any) => {
        
        const active = document.querySelector('.active') as HTMLDivElement | null;
        
        const last = document.querySelector('.last') as HTMLDivElement | null;
        
        let next = active?.nextElementSibling;
        
        if (!next) {
          next = this.slideContainer.nativeElement.firstElementChild;
          console.log(next)
        }
        active?.classList.remove('active')
        last?.classList.remove('last')
        next?.classList.remove('next')
      
        if (type === 'prev') {
          active?.classList.add('next')
          last?.classList.add('active')
          next = last?.previousElementSibling
          if (!next) {
            next = this.slideContainer.nativeElement.lastElementChild
           
          }
          next?.classList.remove('next')
          next?.classList.add('last')
          return
        }
        active?.classList.add('last')
        last?.classList.add('next')
        next?.classList.add('active')
      }
  
      this.nextbtn.nativeElement.addEventListener('click',()=>{
        startSlider('');
        
        
      })
      this.prevbtn.nativeElement.addEventListener('click',()=>{
        startSlider('prev');
       
      })
  
      },1000);
    
    })
    
      
=======
  
    
  }






  
  
  
}
