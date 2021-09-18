import axios, { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';

// interface AxiosProps{
//     url: string;
//     method: string;
//     // headers: AxiosRequestConfig | undefined;
//     headers: any ;
//     body: any;
// }

// const useAxios: React.FC<AxiosProps> = ({url, method, headers, body}) => {
const useAxios = ({ url, method, headers = null, body = null }) => {
   const [response, setResponse] = useState(null);
   const [error, setError] = useState('');
//    const [loading, setLoading] = useState(true);


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
