import { Directive, Input,TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  


/* *
 * to make that work we have to use alias or property name 
 * have the same name as selector 'appUnless', angular will transform 
 * '*appUnless' directive into a template with bind to the property 'appUnless'
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * this is a write only porperty (setter of the property Unless) 
 * which get it value from the template (condition) as a boolean input. 
 * so whenever alias appUnless (input = condition) changes,the set method
 * get executed. the change occurs when we pass a parameter (condition)
 * in template to directive [appUnless]="onlyOdd" * 
 * <ng-template [appUnless]="onlyOdd">...</ng-template>
 * 
 * SO angular will look for a property in ts name 'appUnless' which also the directive 
 * name (selector) that why we have to use an alias 'appUnless' OR 
 * we have name the write only property 'Unless' after the directive selector  
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */  
// @Input() set appUnless (condition:boolean) //or the next one:
 @Input('appUnless') set Unless (condition:boolean){
  if (!condition) {
    //we create a template this.templRef in placeholder this.vcRef
    //we get those references through DI; so the directive knows 
    //where in the appComponent to place the <ng-template [appUnless]="onlyOdd">...</ng-template> 
    //in the placeholder where it set on when the onlyOdd is true.
    this.vcRef.createEmbeddedView(this.templRef);
  }else{
    //we clear everything (template) from the placeholder
    this.vcRef.clear();
  }
}

/**
 * Like *ngIf '*unless' will tell angular to create an ng-template where it will set on 
 * and use a property binding [unless]="onlyOdd" : <ng-template [appUnless]="onlyOdd">...</ng-template> 
 * the same as if we use the star *: <div *appUnless ="onlyOdd">...</div>
 * 
 * So we need to get access to the template (templRef:TemplateRef) and 
 * also to the placeholder in HTML where to render it (private vcRef: ViewContainerRef)
 * This will be done through dependency injection.
 */
  constructor(private templRef:TemplateRef<any>, private vcRef: ViewContainerRef) {

   }

}
