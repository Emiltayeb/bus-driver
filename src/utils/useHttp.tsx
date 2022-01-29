import React from 'react';

type UseHttpProps = {
 url?: string;
 method?: string;
 body?: BodyInit | null | undefined;
};

export enum HttpsStatus {
 INITIAL,
 LOADING,
 ERROR,
 COMPLETED
}
const useHttps = function ({ url, method = 'GET', body }: UseHttpProps) {
 const [status, setStatus] = React.useState(HttpsStatus.INITIAL);
 const [data, setData] = React.useState<any>(null);
 const [error, setError] = React.useState<any>(null);

 const postJson = async function (queryParams?: Record<string, any>, body?: any) {
  let searchParams = new URLSearchParams(queryParams);
  try {
   setStatus(HttpsStatus.LOADING);
   const res = await fetch(`${url}?${searchParams.toString()}`, {
    method: 'POST',
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
  }
 };
 const getJson = async function () {
  if (!url) return;
  try {
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
   setData(data);
   setStatus(HttpsStatus.COMPLETED);
  } catch (error: any) {
   setError(error.message);
   setStatus(HttpsStatus.ERROR);
  }
 };

 return { status, data, error, postJson, getJson };
};

export default useHttps;
