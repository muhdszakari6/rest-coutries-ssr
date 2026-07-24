export interface NativeName {
  official: string;
  common: string;
}

export interface CountryNativeName {
  [key: string]: NativeName;
}

export interface CountryNames {
  common: string;
  official: string;
  native: CountryNativeName;
  alternates: string[];
  translations: { [key: string]: NativeName };
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface CountryCurrency {
  [key: string]: Currency;
}

export interface Capital {
  name: string;
  coordinates?: { lat: number; lng: number };
  role?: string;
}

export interface CountryFlag {
  emoji: string;
  unicode: string;
  html_entity: string;
  url_png: string;
  url_svg: string;
  description: string;
}

export interface CountryCodes {
  alpha_2: string;
  alpha_3: string;
  ccn3: string;
  cioc?: string;
  fifa?: string;
  fips?: string;
}

export interface CountryArea {
  kilometers: number;
  miles: number;
}

export interface CountryLanguage {
  iso_639_3: string;
  bcp_47: string;
  name: string;
  native_name: string;
}

export interface CallingCode {
  root: string;
  suffixes: string[];
}

export interface Country {
  names: CountryNames;
  tlds: string[];
  codes: CountryCodes;
  independent: boolean;
  status: string;
  classification: {
    un_member: boolean;
    sovereign: boolean;
  };
  currencies: CountryCurrency;
  calling_codes: CallingCode[];
  capitals: Capital[];
  region: string;
  borders: string[];
  subregion: string;
  languages: CountryLanguage[];
  landlocked: boolean;
  area: CountryArea;
  population: number;
  flag: CountryFlag;
  continents: string[];
}

export interface ApiResponse<T> {
  data: {
    objects: T;
    meta: {
      total: number;
      count: number;
      limit: number;
      offset: number;
      more: boolean;
    };
  };
}
