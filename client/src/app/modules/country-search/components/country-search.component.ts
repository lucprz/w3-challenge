import { Component } from '@angular/core'
import { CountrySearchService } from '../../../core/services/country-search.service'
import { Country } from 'src/app/core/interfaces/country.interface'

@Component({
  selector: 'app-country-search',
  templateUrl: '../pages/country-search.component.html',
  styleUrls: ['../scss/country-search.component.scss']
})
export class CountrySearchComponent {
  searchValue = ''
  countries: Country[] = []

  searchPerformed = false
  noResultsFound = false

  constructor(private countrySearchService: CountrySearchService) {}

  searchCountries() {
    if (this.searchValue.length >= 3) {
      this.searchPerformed = true
      this.noResultsFound = false
      this.countrySearchService.searchCountries(this.searchValue).subscribe(
        (data) => {
          if (data !== undefined) {
            this.countries = data
            this.searchPerformed = true
            if (data.length === 0) {
              this.noResultsFound = true
            }
          } else {
            console.error('Received undefined data')
            this.countries = []
            this.searchPerformed = false
            this.noResultsFound = true
          }
        },
        (error) => {
          console.error('Error searching for countries: ', error)
          this.noResultsFound = true
        }
      )
    } else {
      this.countries = []
      this.searchPerformed = false
      this.noResultsFound = true
    }
  }
}
