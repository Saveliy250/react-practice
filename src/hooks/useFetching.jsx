import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetching = async () => {
        try{
            setIsLoading(true);
            await callback();
        }catch(error){
            setError(error.message);
        }finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}