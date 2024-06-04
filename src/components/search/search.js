import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                // Ensure response has the expected structure
                if (!response.data) {
                    throw new Error("Invalid response structure");
                }

                return {
                    options: response.data.map((city) => ({
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`,
                    })),
                    hasMore: false, // Set this to true if more results can be fetched
                };
            })
            .catch(err => {
                console.error(err);
                return {
                    options: [],
                    hasMore: false,
                };
            });
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
}

export default Search;