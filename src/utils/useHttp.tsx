import React from 'react';

type UseHttpProps = {
 url?: string;
 method?: string;
 body?: any;
 queryParams?: Record<string, any>;
};

export enum HttpsStatus {
 INITIAL,
 LOADING,
 ERROR,
 COMPLETED
}
const useHttps = function () {
 const [status, setStatus] = React.useState(HttpsStatus.INITIAL);
 const [error, setError] = React.useState<any>(null);

 const postJson = async function ({ queryParams, body, url, method = 'POST' }: UseHttpProps) {
  let searchParams = new URLSearchParams(queryParams);
  try {
   setStatus(HttpsStatus.LOADING);
   const res = await fetch(`${url}?${searchParams.toString()}`, {
    method,
    body: JSON.stringify(body),
    headers: {
     'Content-Type': 'application/json'
    }
   });
   if (!res.ok) {
    throw Error;
   }
   setStatus(HttpsStatus.COMPLETED);
  } catch (error: any) {
   setStatus(HttpsStatus.ERROR);
   console.log(error.message);
  } finally {
   setStatus(HttpsStatus.COMPLETED);
  }
 };
 const getJson = async function ({ url, method = 'GET', body }: UseHttpProps) {
  if (!url) return;
  try {
   setStatus(HttpsStatus.LOADING);
   const res = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
     'Content-Type': 'application/json'
    }
   });

   if (!res.ok) {
    throw Error;
   }
   const data = await res.json();
   return data;
  } catch (error: any) {
   setError(error.message);
   setStatus(HttpsStatus.ERROR);
  } finally {
   setStatus(HttpsStatus.COMPLETED);
  }
 };

 return { status, error, postJson, getJson };
};

export default useHttps;
