
import {
  GET_ACTIVITIES,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BYNAME,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  ADD_ACTIVITIES,
  FILTER_CREATED,
  FILTER_BY_REGION,
  GET_COUNTRIES_DETAILS,
  CLEAN,
  SET_PAGE,
  
} from "../actions/componentes";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
   allActivities: [],
  details: {},
  currentPage: 1,
};

export default function rootReducer(state = initialState, actyon) {
  switch (actyon.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: actyon.payload.sort((a, b) => a.name.localeCompare(b.name)),
        allCountries: actyon.payload.sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      };
    case GET_COUNTRY_BYNAME:
      
        return {
          ...state,
          allCountries: actyon.payload,
        };
      
      

    case ORDER_BY_NAME:
      if (actyon.payload === "asc") {
        return {
          ...state,
          allCountries: [...state.allCountries].sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          }),
        };
      }
      if (actyon.payload === "desc") {
        return {
          ...state,
          allCountries: [...state.allCountries].sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (actyon.payload === "All") {
        return {
          ...state,
          allCountries: state.countries,
        };
      } else {
        return {
          ...state,
          allCountries: state.countries,
        };
      }

    case ORDER_BY_POPULATION:
      if (actyon.payload === "menor") {
        return {
          ...state,
          allCountries: [...state.allCountries].sort(function (a, b) {
            if (a.population > b.population) {
              return 1;
            }
            if (b.population > a.population) {
              return -1;
            }
            return 0;
          }),
        };
      }
      if (actyon.payload === "mayor") {
        return {
          ...state,
          allCountries: [...state.allCountries].sort(function (a, b) {
            if (a.population > b.population) {
              return -1;
            }
            if (b.population > a.population) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (actyon.payload === "All") {
        return {
          ...state,
          allCountries: state.countries,
        };
      } else {
        return {
          ...state,
          allCountries: state.countries,
        };
      }

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: actyon.payload,
         allActivities: actyon.payload,
      };

    case FILTER_BY_REGION:
      const allCountries = state.countries;
      const regionFilter =
        actyon.payload === "All"
          ? allCountries
          : allCountries.filter((el) => el.continents === actyon.payload);
      return {
        ...state,
        allCountries: regionFilter,
      };

    case FILTER_CREATED:
      let filter =
        actyon.payload === "Sin Filtrar "
          ? state.countries
          : state.countries.filter((country) => {
              const activities = country.Activities.map((a) => a.name);
              return activities.includes(actyon.payload);
            });

      return {
        ...state,
        allCountries: filter,
      };

    case GET_COUNTRIES_DETAILS:
      return {
        ...state,
        details: actyon.payload,
      };

    case ADD_ACTIVITIES:

      return {
        ...state,
        activities: [...state.activities, actyon.payload]
      };
        

    case CLEAN:
      return {
        ...state,
        details: {},
        currentPage: 1
        
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: actyon.payload,
      };

    default:
      return { ...state };
  }
}
