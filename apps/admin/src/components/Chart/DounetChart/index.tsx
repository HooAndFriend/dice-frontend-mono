// ** React Imports
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

interface PropsType {
  width?: string
  height?: string
  status?: string
  value?: number
}

const DonutChart = ({ width, height, status, value }: PropsType) => {
  const options: ApexOptions = {
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            value: { show: true },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ['Team A', 'Team B'],
    colors: ['#623AD6', '#676767'],
    legend: {
      show: false,
    },
    stroke: {
      show: false,
    },
  }

  const series = [75, 25]

  return (
    <div className="relative">
      <Chart
        options={options}
        series={series}
        type="donut"
        height={width ? width : '235px'}
        width={height ? height : '235px'}
      />
      <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <h1 className="text-[32px] font-bold">{value ? `${value}%` : ''}</h1>
        <h1 className="text-[16px] text-[#676767]">{status ? status : ''}</h1>
      </div>
    </div>
  )
}

export default DonutChart
