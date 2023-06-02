import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Country } from 'src/app/core/interfaces/country.interface'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CountrySearchService {
  constructor(private http: HttpClient) {}

  searchCountries(searchValue: string): Observable<Country[]> {
    const apiUrl = environment.apiUrl

    if (searchValue.length >= 3) {
      return this.http
        .get<{ countries: Country[] }>(
          `${apiUrl}/countries?value=${searchValue}`
        )
        .pipe(map((data) => data.countries))
    } else {
      return of([])
    }
  }
}
