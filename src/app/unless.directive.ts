import { Directive, Input,TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  /*
  //to make that work we have to use alias or 
  //property name have the same name as selector 'appUnless'

  //angular will transform *appUnless directive into 
  //a template with bind to the property 'appUnless'


    ////////////////////////////////////////////////
  //it's a write only method which receive a boolean...
  ////////////////////////////////////////////////
  */
 @Input('appUnless') set Unless (condition:boolean){
  if (!condition) {
    this.vcRef.createEmbeddedView(this.templRef);
  }else{
    this.vcRef.clear();
  }
}
//we use injection to locate the placeholder of the template 
  constructor(private templRef:TemplateRef<any>, private vcRef: ViewContainerRef) {

   }

}
