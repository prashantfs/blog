import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
