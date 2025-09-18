"use client";

import { useState, useCallback } from "react";
import { getData, postData } from "./utils";

type RequestStatus<T> = {
  loading: boolean;
  success: boolean;
  error: Error | null;
  data: T | null;
};

export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number | null>(null); // ✅ should be number

  const fetchGet = useCallback(async (reference: string) => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      const result = await getData(reference); // adjust if getData includes status
      setData(result);
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPost = useCallback(
    async (
      reference: string,
      body: any,
      method: "POST" | "PUT" | "PATCH",
      useFormData: boolean = false
    ) => {
      setLoading(true);
      setSuccess(false);
      setError(null);
      setStatus(null); // reset previous status

      try {
        const res = await postData(reference, body, method, useFormData);

        setData(res.data);
        setStatus(res.status);
        (res.status === 201 || res.status === 200) && setSuccess(true);

        return res;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    success,
    error,
    data,
    status,
    fetchGet,
    fetchPost,
  };
}
