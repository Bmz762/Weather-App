import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FavoriteButton from "@/components/ui/favorite-button";
import WeatherDetails from "@/components/weather-datails";
import WeatherForecast from "@/components/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"

const CityPage = () => {
  const [searchParams]=useSearchParams()
  const params = useParams();
  const lat= parseFloat(searchParams.get("lat")||"0");
  const lon= parseFloat(searchParams.get("lon")||"0");
  const coordinates = {lat,lon};
  const forecastQuery= useForecastQuery(coordinates);
  const weatherQuery=useWeatherQuery(coordinates);
  
  if (weatherQuery.error || forecastQuery.error){
    
    return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4"/>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
      </AlertDescription>
    </Alert>);
  }
  if(!weatherQuery.data||!forecastQuery.data||!params.cityName){
    return <WeatherSkeleton />
  }
  return(
    <div className="space-y-4">{/*fav cities*/}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName},
          {weatherQuery.data.sys.country}
        </h1>
        <div>
          {/* //favoritebutton */}
          <FavoriteButton data={{ ...weatherQuery.data,name:params.cityName}}/>
        </div>

      </div>
      {/* // {Current and Hourly weather} */}
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          <CurrentWeather data={weatherQuery.data}/>
          <HourlyTemperature data={forecastQuery.data} />

        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data}/>
          <WeatherForecast data={forecastQuery.data}/>

        </div>
      </div>
    </div>)
};

export default CityPage
