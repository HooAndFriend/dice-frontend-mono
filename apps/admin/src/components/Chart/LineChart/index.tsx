import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface LineChartProps {
  categories: string[]
  seriesData: number[]
}

const LineChart: React.FC<LineChartProps> = ({ categories, seriesData }) => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: categories,
    },
  }

  const series = [
    {
      name: 'Data Series 1',
      data: seriesData,
    },
  ]

  return <Chart options={options} series={series} type="line" height="350" />
}

export default LineChart
