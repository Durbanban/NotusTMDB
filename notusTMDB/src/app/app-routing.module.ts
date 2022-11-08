import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginAppComponent } from "./components/login-app/login-app.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { PortadaComponent } from "./components/portada/portada.component";
import { FilmDetailsComponent } from "./components/film-details/film-details.component";
import { FilmListComponent } from "./components/film-list/film-list.component";
import { SeriesListComponent } from "./components/series-list/series-list.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { CardTableSeriesComponent } from "./components/card-table-series/card-table-series.component";
import { RatedFilmsListComponent } from "./components/rated-films-list/rated-films-list.component";
import { PopularActorsListComponent } from "./components/popular-actors-list/popular-actors-list.component";
import { ActorDetailsComponent } from "./components/actor-details/actor-details.component";


const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "films", component: FilmListComponent},
  { path: "rated-films", component: RatedFilmsListComponent},
  { path: "series", component: SeriesListComponent},
  { path: "detallesSeries", component: CardTableSeriesComponent},
  { path: "films/:id", component: FilmDetailsComponent},
  { path: "landing", component: LandingComponent },
  { path: "loginApp", component: LoginAppComponent },
  { path: "portada", component: PortadaComponent },
  { path: "actors", component: PopularActorsListComponent },
  { path: "actors/:id", component: ActorDetailsComponent },
  { path: "", component: PortadaComponent, pathMatch: 'full'},
  { path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
