import type { Coordinates } from "@/api/types";
import {useEffect, useState} from "react";

interface GeolocaionState{
    coordinates:Coordinates|null;
    error:string|null;
    isLoading:boolean;
}

export function useGeolocation(){
    const [locationData,setLocationData]=useState<GeolocaionState>({
        coordinates:null,
        error:null,
        isLoading:true,

    });
    const  getLocation=()=>{
        setLocationData((prev)=>({...prev,isLoading:true,error:null}));
        if(!navigator.geolocation){
            setLocationData({
                coordinates:null,
                error:"Geolocation is not supported by your browser",
                isLoading:false,
            })
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{setLocationData({
            coordinates:{
                lat:position.coords.latitude,
                lon:position.coords.longitude,
            },
            error:null,
            isLoading:false,
        })
    },(error)=>{
        let errorMessage:string;
        switch(error.code){
            case error.PERMISSION_DENIED:
                errorMessage="Location permission denied. Please enable location access.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage="Location information is unavailable.";
                break;
            case error.TIMEOUT:
                errorMessage="Location request timed out.";
                break;
            default:
                errorMessage= "An unknown error occurred.";
                break;
        }
        setLocationData({
            coordinates:null,
            error:errorMessage,
            isLoading:false,
        })
    },{
        enableHighAccuracy:true,// get precise location
        timeout:5000,// 5 secodns before timeout error
        maximumAge:0,// gett current location
    })


    }

    useEffect(()=>{
        getLocation();

    },[])

    return {
        ...locationData,
        getLocation,
    }

}