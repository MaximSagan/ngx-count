import { NgModule } from '@angular/core';
import { NgxCountDirective } from './ngx-count.directive';
import { NgxCountRootDirective } from './ngx-count-root.directive';

@NgModule({
  imports: [],
  declarations: [NgxCountDirective, NgxCountRootDirective],
  exports: [NgxCountDirective, NgxCountRootDirective]
})
export class NgxCountModule { }
