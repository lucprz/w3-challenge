import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CountrySearchComponent } from './modules/country-search/components/country-search.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { CountrySearchModule } from './modules/country-search/country-search.module'

@NgModule({
  declarations: [AppComponent, CountrySearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CountrySearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
