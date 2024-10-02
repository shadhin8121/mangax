"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const React_query_wrapper = ({ children }: { children: React.ReactNode }) => {
    let queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default React_query_wrapper;
