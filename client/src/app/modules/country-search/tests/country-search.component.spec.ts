import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormsModule } from '@angular/forms'
import { CountrySearchComponent } from '../components/country-search.component'
import { CountrySearchService } from '../../../core/services/country-search.service'

import { HttpClient } from '@angular/common/http'
import { of, throwError } from 'rxjs'

describe('CountrySearchComponent', () => {
  let component: CountrySearchComponent
  let fixture: ComponentFixture<CountrySearchComponent>
  let httpClient: HttpClient

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CountrySearchComponent],
      providers: [CountrySearchService]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySearchComponent)
    component = fixture.componentInstance
    httpClient = TestBed.inject(HttpClient)
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize component properties correctly', () => {
    expect(component.searchValue).toBe('')
    expect(component.countries).toEqual([])
    expect(component.searchPerformed).toBe(false)
    expect(component.noResultsFound).toBe(false)
  })

  it('should reset component properties when search value is less than 3 characters', () => {
    component.searchValue = 'us'
    component.searchCountries()
    expect(component.countries).toEqual([])
    expect(component.searchPerformed).toBe(false)
    expect(component.noResultsFound).toBe(true)
  })

  it('should perform country search and update component properties', () => {
    const mockResponse = {
      countries: [{ name: 'USA' }, { name: 'Canada' }]
    }

    spyOn(httpClient, 'get').and.returnValue(of(mockResponse))

    component.searchValue = 'usa'
    component.searchCountries()

    expect(component.searchPerformed).toBe(true)
    expect(component.noResultsFound).toBe(false)
    expect(component.countries).toEqual(
      jasmine.arrayContaining(
        mockResponse.countries.map((country) =>
          jasmine.objectContaining(country)
        )
      )
    )
  })

  it('should handle error during country search', () => {
    const mockError = 'Error searching for countries'
    spyOn(console, 'error')
    spyOn(httpClient, 'get').and.returnValue(throwError({ message: mockError }))

    component.searchValue = 'usa'
    component.searchCountries()

    expect(component.searchPerformed).toBe(true)
    expect(component.noResultsFound).toBe(true)
    expect(console.error).toHaveBeenCalledWith(
      'Error searching for countries: ',
      { message: mockError }
    )
  })
})
