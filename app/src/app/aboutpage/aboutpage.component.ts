import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-aboutpage',
  templateUrl: './aboutpage.component.html',
  styleUrls: ['./aboutpage.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AboutpageComponent implements AfterViewInit{

  @ViewChild('slidecontainer') slideContainer:ElementRef;
  @ViewChild('prevbtn') prevbtn:ElementRef;
  @ViewChild('nextbtn') nextbtn:ElementRef;

  data = [
  

    {
      img:
      "assets/fitnes.jpg",
      name: "emma doe",
      job: "designer",
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta nihil nam omnis?`,
    },
    {
      img:
      "assets/fitnes2.jpg",
      name: "emma doe",
      job: "designer",
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta nihil nam omnis?`,
    },
    {
      img:
      "assets/fitnes1.jpg",
      name: "emma doe",
      job: "designer",
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta nihil nam omnis?`,
    },
  ];

  ngAfterViewInit(){
      if (this.data.length === 1){
        this.nextbtn.nativeElement.style.display = 'none';
        this.prevbtn.nativeElement.style.display = 'none';
      }

      let people = [...this.data];
      if (this.data.length === 2){
        people = [...this.data,...this.data]
      }
      

      this.slideContainer.nativeElement.innerHTML = people
      .map((person, slideIndex) => {
        const { img, name, job, text } = person
        let position = 'next'
        if (slideIndex === 0) {
          position = 'active'
        }
        if (slideIndex === people.length - 1) {
          position = 'last'
        }
        if (people.length <= 1) {
          position = 'active'
        }
        return `<article class="slide ${position}">
      <img src=${img}  class="img" alt="${name}"/>
      <h4>${name}</h4>
      <p class="title">${job}</p>
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

    
  }






  
  
  
}
