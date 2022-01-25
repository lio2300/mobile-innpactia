import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AdminSettingsService } from 'src/app/services/AdminSettings.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(
    public _AdminSettingsService: AdminSettingsService,
    private classToggler: ClassToggleService,
    private route: Router
  ) {
    super();
  }
  SessionDestroy() {
    this._AdminSettingsService.limpiarTokenUser();
    this.route.navigate(['/login']);
  }
}
