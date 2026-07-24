import { State } from './../../state/app.state';
import { State as CountryState } from './../../pages/country/state/reducers/country.reducers';
import { State as CountriesState } from './../../pages/countries/state/reducers/countries.reducers';

export const rootInitalState: State = {
  routes: { routes: [] },
  theme: { isDarkTheme: true },
}

export const countryRootInitalState: CountryState = {
  routes: { routes: [] },
  theme: { isDarkTheme: true },
  country: {
    country: undefined,
    error: "",
    loading: false,
    borderCountries: [],
    borderCountriesLoading: false,
    borderCountriesError: ""
  }
}

export const countriesRootInitalState: CountriesState = {
  routes: { routes: [] },
  theme: { isDarkTheme: true },
  countries: {
    countries: [],
    error: "",
    loading: false
  }
}

export const TESTING_CONSTANTS = {
  BASE_URL: 'https://api.restcountries.com/countries/v5',
  COUNTRY_NAME: 'Moldova',
  BORDER_COUNTRIES_CODE: ['arg', 'nig'],
  REGION: "Africa",
  COUNTRIES: [
    {
      "names": {
        "common": "Uruguay",
        "official": "Oriental Republic of Uruguay",
        "alternates": [],
        "translations": {},
        "native": {
          "spa": {
            "official": "República Oriental del Uruguay",
            "common": "Uruguay"
          }
        }
      },
      "tlds": [".uy"],
      "codes": {
        "alpha_2": "UY",
        "ccn3": "858",
        "alpha_3": "URY",
        "cioc": "URU"
      },
      "independent": true,
      "status": "officially-assigned",
      "classification": {
        "un_member": true,
        "sovereign": true
      },
      "currencies": {
        "UYU": {
          "name": "Uruguayan peso",
          "symbol": "$"
        }
      },
      "calling_codes": [{ "root": "+5", "suffixes": ["98"] }],
      "capitals": [{ "name": "Montevideo" }],
      "region": "Americas",
      "subregion": "South America",
      "languages": [
        { "iso_639_3": "spa", "bcp_47": "es", "name": "Spanish", "native_name": "Español" }
      ],
      "landlocked": false,
      "borders": ["ARG", "BRA"],
      "area": { "kilometers": 181034, "miles": 69895 },
      "population": 3473727,
      "flag": {
        "emoji": "🇺🇾",
        "unicode": "U+1F1FA U+1F1FE",
        "html_entity": "&#x1F1FA;&#x1F1FE;",
        "url_png": "https://flagcdn.com/w320/uy.png",
        "url_svg": "https://flagcdn.com/uy.svg",
        "description": "The flag of Uruguay"
      },
      "continents": ["South America"]
    },
    {
      "names": {
        "common": "Paraguay",
        "official": "Republic of Paraguay",
        "alternates": [],
        "translations": {},
        "native": {
          "grn": {
            "official": "Tetã Paraguái",
            "common": "Paraguái"
          },
          "spa": {
            "official": "República de Paraguay",
            "common": "Paraguay"
          }
        }
      },
      "tlds": [".py"],
      "codes": {
        "alpha_2": "PY",
        "ccn3": "600",
        "alpha_3": "PRY",
        "cioc": "PAR"
      },
      "independent": true,
      "status": "officially-assigned",
      "classification": {
        "un_member": true,
        "sovereign": true
      },
      "currencies": {
        "PYG": {
          "name": "Paraguayan guaraní",
          "symbol": "₲"
        }
      },
      "calling_codes": [{ "root": "+5", "suffixes": ["95"] }],
      "capitals": [{ "name": "Asunción" }],
      "region": "Americas",
      "subregion": "South America",
      "languages": [
        { "iso_639_3": "grn", "bcp_47": "gn", "name": "Guaraní", "native_name": "Guaraní" },
        { "iso_639_3": "spa", "bcp_47": "es", "name": "Spanish", "native_name": "Español" }
      ],
      "landlocked": true,
      "borders": ["ARG", "BOL", "BRA"],
      "area": { "kilometers": 406752, "miles": 156059 },
      "population": 7132530,
      "flag": {
        "emoji": "🇵🇾",
        "unicode": "U+1F1F5 U+1F1FE",
        "html_entity": "&#x1F1F5;&#x1F1FE;",
        "url_png": "https://flagcdn.com/w320/py.png",
        "url_svg": "https://flagcdn.com/py.svg",
        "description": "The flag of Paraguay"
      },
      "continents": ["South America"]
    }
  ]
}
