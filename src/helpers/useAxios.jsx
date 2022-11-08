import axios from 'axios';
import { useEffect, useState } from 'react';

// interface AxiosProps{
//     url: string;
//     method: string;
//     // headers: AxiosRequestConfig | undefined;
//     headers: any ;
//     body: any;
// }

const useAxios = ({ url, method, headers = null, body = null }) => {
   const [response, setResponse] = useState(null);
   const [error, setError] = useState('');


    useEffect(() => {

        // const key: (keyof AxiosProps) = 'method';
        
        (async () => {
            try {
                const res = await axios[method](url, JSON.parse(headers), JSON.parse(body));
                const data = await res.data; 
                setResponse(data);
            } catch (error) {
                console.log(error);
                setError(error);
            }})();

    }, [method, url, body, headers]);


    return { response, error };

}

export default useAxios;
