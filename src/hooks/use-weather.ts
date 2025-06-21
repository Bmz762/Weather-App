import type { Coordinates } from "@/api/types"
import { weatherAPI } from "@/api/weather"
import { useQuery } from "@tanstack/react-query"

export const Weather_Keys={
    weather:(coords:Coordinates)=>["weather",coords] as const,
    forecast:(coords:Coordinates)=>["forecast",coords] as const,
    location:(coords:Coordinates)=>["location",coords] as const,
    search:(query:string)=>["location-search",query] as const,
    

}as const;

export function useWeatherQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey:Weather_Keys.weather(coordinates??{lat:0,lon:0}),
       queryFn:()=>
        coordinates?weatherAPI.getCurrentWeather(coordinates):null,
       enabled: !!coordinates,
    });
    
}
export function useForecastQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey:Weather_Keys.forecast(coordinates??{lat:0,lon:0}),
       queryFn:()=>
        coordinates?weatherAPI.getForecast(coordinates):null,
       enabled: !!coordinates,
    });}

export function useReverseGeocodeQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey:Weather_Keys.location(coordinates??{lat:0,lon:0}),
       queryFn:()=>
        coordinates?weatherAPI.reverseGeocode(coordinates):null,
       enabled: !!coordinates,
    });
}

export function useLocationSearch(query:string){
    return useQuery(
        {
            queryKey:Weather_Keys.search(query),
            queryFn:()=>
                weatherAPI.searchLocations(query),
            enabled:query.length>=1,
        }
    )
}
