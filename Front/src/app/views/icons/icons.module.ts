import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { CoreUIIconsComponent } from './coreui-icons.component';
import { IconsRoutingModule } from './icons-routing.module';
import { ComponentsModule } from '../../../components/components.module';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    IconsRoutingModule,
    CardModule,
    GridModule,
    IconModule,
    CommonModule,
    ComponentsModule,
    MatIconModule
  ],
  declarations: [
    CoreUIIconsComponent
  ]
})
export class IconsModule {
}
