export interface NativeName {
  official: string,
  common: string
}

export interface CountryNativeName {
  [key: string]: NativeName;
}

export interface CountryName {
  common: string,
  official: string,
  nativeName: CountryNativeName
}

export interface Currency {
  name: string,
  symbol: string
}

export interface CountryCurrency {
  [key: string]: Currency;

}

export interface Idd {
  root: string,
  suffixes: string[]
}

export interface Language {
  [key: string]: string
}

export interface Translations {
  [key: string]: NativeName

}

export interface Flags {
  svg: string,
  png: string
}

export interface Denonym {
  f: string,
  m: string
}

export interface CountryDenonym {
  [key: string]: Denonym

}

export interface Country {
  name: CountryName,
  tld: string[],
  cca2: string,
  ccn3: string,
  cca3: string,
  cioc: string,
  independent: boolean,
  status: string,
  unMember: boolean,
  currencies: CountryCurrency,
  idd: Idd,
  capital: string[]
  altSpellings: string[],
  region: string,
  borders: string[],
  subregion: string,
  languages: Language,
  translations: Translations,
  latlng: number[],
  landlocked: boolean,
  area: number,
  population: number,
  flag: string,
  flags: Flags,
  demonyms: CountryDenonym
}
