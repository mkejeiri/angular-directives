import { Directive,ElementRef, OnInit } from '@angular/core';
@Directive({
    selector:'[appBasicHighlight]' //so that within the template we could use 'appBasicHighlight' instead of [appBasicHighlight]
                                   //so recognizeable as attribute without square bracket when added into an element
})
export class BasicHighLightDirective implements OnInit  {
    //changing the background color through injection.
    constructor(private elementRef:ElementRef){ //private will make elementRef a private property of the class
                                                //short hand syntax when assigning the values from the constructor
                                                // the property of class.
    } 

    /* *
     * Directive has only ngOnInit() and ngDestoy Lifecycle Hooks, BUT
     * it doesn't have other Lifecycle Hooks such as: DoCheck,AfterView, AfterContent 
     * because it's a component (no template or view)
     */    
   ngOnInit(){
        /* *
         * We are accessing the element where the directive set on through this.elementRef
         * injected by angular using the dependency injection and with a shorthand syntax we
         * are declaring the 'elementRef' as private property of the component so it will be accessible
         * inside the TS component.
         * 
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
         * 
         * We have to keep in mind that accessing an element through a nativeElement method 
         * is not a good pratice because angular is able to render a template without a DOM!in such case 
         * this property (this.elementRef.nativeElement) might not be available, angular could do this when using service
         * worker in an advanced user cases, that why we ought to create another directive called 'BetterHighlightDirective'
         * using a better approach.
         */
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}