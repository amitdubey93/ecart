import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { HomeComponent } from "./home/home.component";
import { HttpInterceptorProviders } from "./interceptors/auth-header-interceptor.service";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from './blocks/root/app.component';
import { BlocksModule } from './blocks/blocks.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    BlocksModule
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
