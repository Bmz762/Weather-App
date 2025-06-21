export const API_CONFIG = {
    BASE_URL:"https://api.openweathermap.org/data/2.5",//for current weather
    GEO:"http://api.openweathermap.org/geo/1.0",// geocode to get city name
    API_KEY:import.meta.env.VITE_OPENWEATHER_API_KEY,
    DEFAULT_PARAMS:{
        units:"imperial",// iur units which will be displayed to the user
        appid:import.meta.env.VITE_OPENWEATHER_API_KEY,
    }

}