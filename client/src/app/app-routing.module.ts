import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () =>
      import('./modules/country-search/country-search.module').then(
        (m) => m.CountrySearchModule
      )
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
