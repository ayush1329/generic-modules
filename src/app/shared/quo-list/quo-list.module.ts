import {NgModule} from '@angular/core';
import {QuoListComponent} from './quo-list.component';
import {CommonModule} from '@angular/common';
import {QuoListItemSelectDirective} from './quo-list-directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [QuoListComponent, QuoListItemSelectDirective],
  exports: [QuoListComponent, QuoListItemSelectDirective],
  imports: [CommonModule, NgbModule, FormsModule],
  providers: []
})

export class QuoListModule {

}
