import { Component } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'form-client';
}
