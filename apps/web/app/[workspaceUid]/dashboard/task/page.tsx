'use client'

// ** Component Imports
import GanttContainer from "@/src/container/gantt-container";

// ** Type Imports
import {GetEpicListResponse, GetGanttEpicListResponse} from '@/src/type/epic'

// ** Service Imports
import useSWR from 'swr'
import { Get } from '@/src/repository'

const GanttPage = () => {
  const {
    data,
    error,
    isLoading,
    mutate: epicRefetch,
  } = useSWR('/v1/epic', async (url) => Get<GetGanttEpicListResponse>(url))

  if (error) return;

  return <GanttContainer data={isLoading ? [] : data.data.data} />
};

export default GanttPage;
