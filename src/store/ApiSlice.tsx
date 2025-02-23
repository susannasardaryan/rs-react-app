import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Person {
    name: string;
    birth_year: string;
    url: string;
}

interface PeopleResponse{
    results: Person[],
}

interface QueryArgs {
    searchTermValue: string;
    pageNumber: number;
}

interface Person {
    name: string;
    height: string;
    mass: string;
    birth_year: string
};

export const peopleDataApi = createApi({
    reducerPath: 'peopleDetailsApi',
    baseQuery : fetchBaseQuery({
        baseUrl: "https://swapi.dev/api/people",
    }),
    endpoints: (builder) => ({
        getPersonData: builder.query<Person, string>({
            query: (id) => `/${id}`,
        }),
        getSearchedData: builder.query<PeopleResponse, QueryArgs>({
            query: ({searchTermValue, pageNumber}) => `/?page=${pageNumber}&search=${searchTermValue || ''}`,
        })

    })

})

export const {useGetPersonDataQuery, useGetSearchedDataQuery} = peopleDataApi;