import React, { useCallback, useState } from 'react';
import './Filter.scss';

interface Props {
  handleSetCountries: (query: string) => Promise<void>;
  handleSearchQuery: (query: string) => Promise<void>;
  isError: boolean;
  handleSetError: () => void;
}

export const Filter: React.FC<Props> = React.memo(
  ({
    handleSetCountries,
    handleSearchQuery,
    isError,
    handleSetError,
  }) => {
    const [query, setQuery] = useState({
      searchQuery: '',
      filterQuery: '',
    });
    const [loading, setLoading] = useState({
      searchQueryIsLoading: false,
      filterQueryIsLoading: false,
    });
  
    const handleFormSubmission = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(prevState => ({
          ...prevState,
          searchQueryIsLoading: true,
        }));
  
        handleSearchQuery(query.searchQuery)
          .finally(() => {
            setLoading(prevState => ({
              ...prevState,
              searchQueryIsLoading: false,
            }));
          });
  
        setQuery(prevState => ({
          ...prevState,
          filterQuery: '',
        }));
      },
      [handleSearchQuery, query.searchQuery],
    );
  
    return (
      <form className="form" onSubmit={handleFormSubmission}>
        {isError
        ? (
            <div className="form__input form__input--isError">
              <input
                type="text"
                placeholder="Search for a country..."
                className="form__input-field"
                value={query.searchQuery}
                onChange={(event) => {
                  setQuery(prevState => ({
                    ...prevState,
                    searchQuery: event.target.value,
                  }));
                  handleSetError();
                }}
                onFocus={handleSetError}
              />
  
              {loading.searchQueryIsLoading && <div className="loading-animation"></div>}
  
              <p className="error-message">Carefully check the spelling or try an alternative name</p>
            </div>
        )
        : (
            <div className="form__input">
              <input
                type="text"
                placeholder="Search for a country..."
                className="form__input-field"
                value={query.searchQuery}
                onChange={(event) => {
                  setQuery(prevState => ({
                    ...prevState,
                    searchQuery: event.target.value,
                  }));
                }}
              />

              <button type="submit" className='submit-button'>{'>'}</button>
  
              {loading.searchQueryIsLoading && <div className="loading-animation"></div>}
            </div>
        )}
  
        <div className="form__selector">
          <select
            name="filter"
            title="filter"
            className="form__selector-field"
            value={query.filterQuery}
            onChange={(event) => {
              setLoading(prevState => ({
                ...prevState,
                filterQueryIsLoading: true,
              }));

              setQuery({
                filterQuery: event.target.value,
                searchQuery: '',
              });

              handleSetCountries(event.target.value)
                .finally(() => {
                  setLoading(prevState => ({
                    ...prevState,
                    filterQueryIsLoading: false,
                  }));
                });
            }}
          >
            <option value=""disabled>Filter by region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
  
          {loading.filterQueryIsLoading && <div className="loading-animation"></div>}
        </div>
      </form>
    )
  }
);
