import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { ButtonComponent } from './button/button.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    PageTitleComponent,
    NotificationComponent,
    NotificationComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    ButtonComponent,
    PageTitleComponent,
    NotificationComponent,
  ],
})
export class SharedModule {}
