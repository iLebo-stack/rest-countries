import React, { useCallback, useState } from 'react';
import './DetailsPage.scss';

interface Props {
  country: Country;
  handleSetSelectedCountry: (country: Country | null) => void
}

export const DetailsPage: React.FC<Props> = React.memo(
  ({ country, handleSetSelectedCountry }) => {
    const [isLoading, setIsLoading] = useState(false);

    const findCountry = useCallback(
      (alpha3Code: string) => {
        setIsLoading(true);
  
        fetch('https://restcountries.com/v2/all')
          .then(response => response.json())
          .then(data => {
            const newCountry = data.find((newCountry: Country) => newCountry.alpha3Code === alpha3Code);
            handleSetSelectedCountry(newCountry);
          }).finally(() => {
            setIsLoading(false);
          });
      },
      [handleSetSelectedCountry],
    );

    return (
      <section className="details-page">
        <button
          type="button"
          className="details-page__button"
          onClick={() => {
            handleSetSelectedCountry(null);
          }}
        >
          Back
        </button>

        {isLoading
          ? <div className="loading_animation"></div>
          : (
            <article className="country">
              <div className="country__details">
                <h2 className="country__details-title">{country.name}</h2>
        
                <div className="country-details-content-wrapper detail_1">
                  <p><strong>Native Name:</strong> {country.nativeName}</p>
                  <p><strong>Population:</strong> {country.population}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Sub Region:</strong> {country.subregion}</p>
                  <p><strong>Capital:</strong> {country.capital}</p>
                </div>
        
                <div className="country-details-content-wrapper detail_2">
                  <p><strong>Top Level Domain:</strong> {country.topLevelDomain}</p>
                  <p>
                    <strong>Currencies:</strong>
                    {' '}
                    {country.currencies.map(({ name }, i) => {
                      if (country.currencies.length === i + 1) {
                        return <span key={name}>{name}</span>;
                      }
        
                      return <span key={name}>{name}, </span>;
                    })}
                  </p>
                  <p>
                    <strong>Languages:</strong>
                    {' '}
                    {country.languages.map(({ name }, i) => {
                      if (country.languages.length === i + 1) {
                        return <span key={name}>{name}</span>;
                      }
        
                      return <span key={name}>{name}, </span>;
                    })}
                  </p>
                </div>
        
                {country.borders && (
                  <div className="border-countries-wrapper buttons">
                    <strong>Border Countries:</strong>
                    <div className='border-countries-button-wrapper'>
                      {country.borders.map(neighbouring => (
                        <button
                          key={neighbouring}
                          type="button"
                          className="country__button"
                          onClick={() => {
                            findCountry(neighbouring);
                          }}
                        >
                          {neighbouring}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="country__image">
                <img src={country.flags.png} alt={country.name + ' flag'} className="image details-image" />
              </div>
            </article>
          )}
      </section>
    );
  }
);
