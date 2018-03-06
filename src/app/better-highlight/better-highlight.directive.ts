import { Directive, 
  Renderer2,
   OnInit,
   ElementRef, 
   HostListener,
   HostBinding,
   Input} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor:string = 'transparent';
  /**
   * we use the alias name after the directive appBetterHighlight so we can
   * bind the HTML element to the directive and also use it to access the highLightColor
   * property from template in one single shoot'
   */
  @Input("appBetterHighlight") highLightColor:string = 'blue';

  
  
  constructor(private elRef:ElementRef, private renderer:Renderer2) {}

  /**
   * using a 'renderer'to access the DOM is usually the best pratice, because:
   * Angular is not limited to run in the browser, it could work in an ENV without accessing the DOM!
   * such as the case with service workers, to change DOM through property such as  
   *  elementRef.nativeElement might be very dangerous!!! 
   */
  ngOnInit(){
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
    this.backgroundColor= this.defaultColor
  }

  

  /**
   * Those events are trigger on the element where this directive set on 
   * @HostListener('DOM event') methodName (eventData:Event)
   */
  @HostListener('mouseenter') mouseover(eventData :Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
    this.backgroundColor = this.highLightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData :Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'background-color','transparent');
    this.backgroundColor =this.defaultColor;
  }

/**
 * Another alternative approach to 'renderer' is to use the HostBinding decorator to bind to 
 * hostPropertyName, here we use for style attributes:
 * Note that we use: 
 *        backgroundColor : because DOM property doesn't know dashes (background-color)...
 *        style.backgroundColor : hostPropertyName in is the 'style', but we accessing 
 *                                the subproperty of the style!
 * 
 * --------------------------------------------------------------------------------------------
 *                            S O M E     E X A M P L E S
 * --------------------------------------------------------------------------------------------
                          @HostBinding('style.color') color: string;
                          @HostBinding('style.border-color') borderColor: string;
                          @HostListener('keydown') newColor() {
                          //doSomething
                          }

                          isActive:boolean;
                          @HostBinding('class.isActive') isActiveAsMethod(){
                            return this.isActive;
                          };
 *
 *                         
 * Here we get access to style property and then background-color subproperty
 */  
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor; //intial value, to avoid err
}
 