import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { BattleScreenComponent } from './battle-screen/battle-screen.component';
import { TraverseScreenComponent } from './traverse-screen/traverse-screen.component';
import { PetManageScreenComponent } from './pet-manage-screen/pet-manage-screen.component';
import { ControlsService } from './services/controls.service';
import { AnimationService } from './services/animation.service';
import { FormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from './_modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    BattleScreenComponent,
    TraverseScreenComponent,
    PetManageScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
  ],
  providers: [
    ControlsService,
    AnimationService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
