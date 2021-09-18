import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import Models from "./Models";


type Clothing = Models['Clothing'];
type Shoes = Models['Shoes'];
type User = Models['User'];



const useFetch = ({
  url,
  method,
  headers,
  body,
}: {
    url: string,
    method: string,
    headers?: HeadersInit | undefined, 
    body?: any
    [key: string]: string | HeadersInit | undefined;
}) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // const key: (keyof AxiosProps) = 'method';

    (async () => {
      try {
        const res = await fetch(url, 
            {
                method: method,
                headers: headers, 
                body: JSON.stringify(body)
        });
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    })();
  }, [method, url, body, headers]);

  return { response, error };
};

export default useFetch;
