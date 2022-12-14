/// <reference types="react-scripts" />

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type Language = {
  name: string;
}

type Country = {
  alpha3Code: string;
  altSpellings: string[];
  name: string;
  nativeName: string;
  population: number;
  region: string;
  capital: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: Language[];
  borders: string[];
  flags: {
    png: string,
    svg: string,
  };
}

type CountryData = {
  countries: Country[] | null,
  selectedCountry: Country | null,
}
