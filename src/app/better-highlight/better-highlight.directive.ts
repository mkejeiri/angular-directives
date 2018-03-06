import { Directive, 
  Renderer2,
   OnInit,
   ElementRef, 
   RendererStyleFlags2,
   HostListener,
   HostBinding,
   Input} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor:string = 'transparent';
  @Input("appBetterHighlight") highLightColor:string = 'blue';

  //backgroundColor : DOM property doesn't know dashes...
  //style.backgroundColor : is DOM property inside the style.
  @HostBinding('style.backgroundColor')  backgroundColor: string = this.defaultColor; //intial value, to avoid err
  
  constructor(private elRef:ElementRef, private renderer:Renderer2) {}

  //this is a better approach because we use the 'renderer':
  //Angular not limited to run in the browser, it could work in an ENV without accessing the DOM
  //such as the case when we work with sercice worker, in such ENV you might not have access to the DOM 
  //to change it. So it's still better pratice to use this approach and to use the methodes provided by the
  //renderer to access the DOM.
  ngOnInit(){
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
    this.backgroundColor= this.defaultColor
  }

  //option 1 : to not use the renderer
  ///@HostListener('DOM event') methodName (eventData:Event)
  @HostListener('mouseenter') mouseover(eventData :Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
    this.backgroundColor =this.highLightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData :Event){
    // this.renderer.setStyle(this.elRef.nativeElement,'background-color','transparent');
    this.backgroundColor =this.defaultColor;
  }
}
 