import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { DetailsPage } from './Components/DetailsPage/DetailsPage';
import { Filter } from './Components/Filter/Filter';

function App() {
  const [countryData, setCountryData] = useState<CountryData>({
    countries: null,
    selectedCountry: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleSetSelectedCountry = useCallback(
    (country: Country | null) => {
      setCountryData(prevState => ({
        ...prevState,
        selectedCountry: country,
      }));
    },
    [],
  );

  const handleSetCountries = useCallback(
    (query: string) => {
      return fetch(`https://restcountries.com/v2/region/${query}`)
        .then(response => response.json())
        .then(data => {
          setCountryData(prevState => ({
            ...prevState,
            countries: data,
          }));
        });
    },
    [],
  );

  const handleSearchQuery = useCallback(
    (query: string) => {
      return fetch('https://restcountries.com/v2/all')
        .then(response => response.json())
        .then(data => {
          setCountryData(prevState => ({
            ...prevState,
            countries: data.filter((countryInfo: Country) => {
              const lowerCasedQuery = query.toLowerCase();

              if (countryInfo.name.toLowerCase().includes(lowerCasedQuery)) {
                return true;
              }

              if (countryInfo.altSpellings) {
                return countryInfo.altSpellings.some(spelling => {
                  return spelling.toLowerCase().includes(lowerCasedQuery);
                });
              }

              return false;
            }),
          }));
        });
    },
    [],
  );

  const handleSetError = useCallback(
    () => setIsError(false),
    [],
  );

  useEffect(
    () => (countryData.countries?.length === 0
            ? setIsError(true)
            : setIsError(false)),
    [countryData.countries]
  )

  useEffect(
    () => {
      fetch('https://restcountries.com/v2/all')
        .then(response => response.json())
        .then(data => {
          setCountryData(prevState => ({
            ...prevState,
            countries: data,
          }));
        })
        .finally(() => {setIsLoading(false)});
    },
    [],
  )

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">What in the world?</h1>
      </header>

      {countryData.selectedCountry
        ? (
          <DetailsPage
            country={countryData.selectedCountry}
            handleSetSelectedCountry={handleSetSelectedCountry}
          />
        )
        : (
          <div className="content-wrapper">
            <section className="filters">
              <Filter
                handleSetCountries={handleSetCountries}
                handleSearchQuery={handleSearchQuery}
                isError={isError}
                handleSetError={handleSetError}
              />
            </section>

            <section className="content">
              {isLoading && (
                <>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>

                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                  <div className="skeleton">
                    <div className="skeleton__image"></div>
                    <div className="skeleton__body">
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                      <div className="skeleton__text"></div>
                    </div>
                  </div>
                </>
              )}
              {countryData.countries?.map(country => (
                <article
                  className="content__card"
                  key={country.name}
                  onClick={() => {
                    setCountryData(prevState => {
                      return {
                        ...prevState,
                        selectedCountry: country,
                      }
                    })
                  }}
                >
                  <div className="content__card-content">
                    <h2>{country.name}</h2>

                    <p><strong>Population:</strong> {country.population}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Capital:</strong> {country.capital}</p>
                  </div>

                  <div className="content__card-image">
                    <img src={country.flags.png} alt={`${country.name} flag`} className="image" />
                  </div>
                </article>
              ))}
            </section>
          </div>
        )}
    </div>
  );
}

export default App;
