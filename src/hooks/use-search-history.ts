import type { SearchHistoryItem } from "@/api/types";
import { useLocalStorage } from "./use-local-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSearchHistroy(){
    const [history,setHistory]=useLocalStorage<SearchHistoryItem[]>("search-history",[]);

    const queryClient=useQueryClient();

    const historyQuery= useQuery({
        queryKey:["search-history"],
        queryFn:()=>history,
        initialData:history,
    })
    const addToHistory=useMutation({
        mutationFn:async(
            search: Omit<SearchHistoryItem,"id"|"searchedAt">
        )=>{
            const newSearch:SearchHistoryItem={
                ...search,
                id:`${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt:Date.now(),
            };
            const filteredHistory=history.filter((item)=>!(item.lat===search.lat && item.lon ===search.lon));
            const newHistory=[newSearch, ...filteredHistory].slice(0,10);
            setHistory(newHistory);
            return newHistory;
        },
        onSuccess:(newHistory)=>{
            queryClient.setQueryData(["search-history"],newHistory)
        },
    });
    const clearHistory=useMutation({
        mutationFn:async()=>{
            setHistory([]);
            return[];
        },
        onSuccess:()=>{
            queryClient.setQueryData(["search-history"],[])
        },

    });
    return{
        history : historyQuery.data??[],
        addToHistory,
        clearHistory,
    }
}