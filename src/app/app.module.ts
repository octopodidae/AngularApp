import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppareilComponent } from "./appareil/appareil.component";
import { AppareilViewComponent } from "./appareil-view/appareil-view.component";
import { AuthComponent } from "./auth/auth.component";
import { SingleAppareilComponent } from "./single-appareil/single-appareil.component";
import { FourOhFourComponent } from "./four-oh-four/four-oh-four.component";
import { EditAppareilComponent } from "./edit-appareil/edit-appareil.component";

import { AppareilService } from "./services/appareil.service";
import { AuthService } from "./services/auth.service";
import { AuthentGuard } from "./services/authent-guard.service";

const routes: Routes = [
  {
    path: "appareils",
    canActivate: [AuthentGuard],
    component: AppareilViewComponent
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "",
    component: AuthComponent
  },
  {
    path: "appareils/:id",
    canActivate: [AuthentGuard],
    component: SingleAppareilComponent
  },
  {
    path: "edit",
    canActivate: [AuthentGuard],
    component: EditAppareilComponent
  },
  { path: "not-found", component: FourOhFourComponent },
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AppareilViewComponent,
    AuthComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AppareilService, AuthService, AuthentGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
