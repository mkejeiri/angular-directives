import { Directive,ElementRef, OnInit } from '@angular/core';
@Directive({
    selector:'[appBasicHighlight]' //recognizeable as attribute without adding 
                                    //a square bracket when added into an element
})
export class BasicHighLightDirective implements OnInit  {
    //changing the background color through injection.
    constructor(private elementRef:ElementRef){ //private will make elementRef a private property of the class
                                                //short hand syntax when assigning the values from the constructor
                                                // the property of class.
    } 

    //Directive has only ngOnInit() hock
   ngOnInit(){
       //this the best place to use it.
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}