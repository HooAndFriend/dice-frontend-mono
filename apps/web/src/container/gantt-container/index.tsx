'use client'

import {Fragment, useMemo, useState} from 'react'
import dayjs from 'dayjs'

// ** Type Imports
import {EpicWithDates} from '@/src/type/epic'

interface PropsType {
  data: EpicWithDates[]
}

interface PositionAndWidth {
  left: string;
  width: string;
}

const GanttContainer = ({data}: PropsType) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [hoveredTask, setHoveredTask] = useState<{ range: string | null, index: string | null }>({
    range: null,
    index: null,
  })

  const getMonthlyRange = (earliestDate: string, latestDate: string) => {
    const startDate = dayjs(earliestDate).startOf('month')
    const endDate = dayjs(latestDate).endOf('month')

    const months: string[] = []

    for (
      let date = startDate;
      date.isBefore(endDate) || date.isSame(endDate, 'month');
      date = date.add(1, 'month')
    ) {
      months.push(date.format('YYYY.M'))
    }

    return months
  }


  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((row) => row !== index) : [...prev, index]
    )
  }


  const processedData = useMemo(() => {
    let startMonth: string | null = null
    let endMonth: string | null = null

    const updatedData = data.map((epic) => {
      let earliestCreatedDate: string | null = null
      let latestDueDate: string | null = null

      epic.ticket.forEach((ticket) => {
        ticket.createdDate = ticket.createdDate.substring(0, 10)

        if (!earliestCreatedDate || ticket.createdDate < earliestCreatedDate) {
          earliestCreatedDate = ticket.createdDate
        }
        if (!startMonth || ticket.createdDate < startMonth) {
          startMonth = ticket.createdDate
        }

        if (!latestDueDate || ticket.dueDate > latestDueDate) {
          latestDueDate = ticket.dueDate
        }
        if (!endMonth || ticket.dueDate > endMonth) {
          endMonth = ticket.dueDate
        }
      })

      return { ...epic, startDate: earliestCreatedDate, endDate: latestDueDate }
    })

    return { updatedData, startMonth, endMonth }
  }, [data])

  const months = useMemo(
    () => getMonthlyRange(processedData.startMonth!, processedData.endMonth!),
    [processedData]
  )

  const calculatePositionAndWidth = (taskStartDate: string, taskEndDate: string): PositionAndWidth => {
    const startDate = dayjs(months[0].replace('.', '-'), 'YYYY.M').startOf('month')
    const endDate = dayjs(months[months.length - 1].replace('.', '-'), 'YYYY.M').endOf('month')
    const taskStart = dayjs(taskStartDate)
    const taskEnd = dayjs(taskEndDate)

    const totalDays = endDate.diff(startDate, 'day') + 1
    const taskStartOffset = taskStart.diff(startDate, 'day')
    const taskDuration = taskEnd.diff(taskStart, 'day') + 1 // Add 1 to include the end date

    const left = (taskStartOffset / totalDays) * 100
    const width = (taskDuration / totalDays) * 100

    return { left: `${left}%`, width: `${width}%` }
  }

  return (
    <div className="bg-white mt-6 p-6 rounded-lg w-full">
      <div className="flex">
        <div className="overflow-x-auto">
          <table className="bg-white border-collapse table-fixed min-w-[350px]">
            <thead>
            <tr>
              <th className="p-2 text-left bg-white border min-w-[350px]">스프린트</th>
            </tr>
            </thead>
            <tbody>
            {processedData.updatedData.map((item) => (
              <Fragment key={item.epicId}>
                <tr>
                  <td
                    className="p-2 bg-white border cursor-pointer min-w-[350px]"
                    onClick={() => toggleRow(item.epicId)}
                  >
                    {item.code + ' ' + item.name}
                  </td>
                </tr>
                {expandedRows.includes(item.epicId) &&
                  item.ticket.map((subItem) => (
                    <tr key={subItem.ticketId}>
                      <td className="p-2 pl-10 bg-white border min-w-[350px]">
                        {subItem.code + ' ' + subItem.name}
                      </td>
                    </tr>
                  ))}
              </Fragment>
            ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="bg-white border-collapse table-fixed min-w-full h-[45px]">
            <thead>
            <tr>
              {months.map((month) => (
                <th key={month} className="p-2 text-center bg-white border min-w-[200px]">
                  {month}
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {processedData.updatedData.map((item) => {
              const position = calculatePositionAndWidth(item.startDate!, item.endDate!)
              return (
                <Fragment key={item.epicId}>
                  <tr>
                    <td colSpan={months.length} className="relative p-2 border">
                      <div className="relative w-full h-6 bg-gray-200">
                        <div
                          className="absolute h-full bg-purple-400"
                          style={position}
                          onMouseEnter={() =>
                            setHoveredTask({
                              range: `${item.startDate?.replace('-', '.')} - ${item.endDate?.replace('-', '.')}`,
                              index: `${item.epicId}` // Use epicId here for the hoveredTask key
                            })
                          }
                          onMouseLeave={() => setHoveredTask({range: '', index: ''})}
                        >
                          {hoveredTask.range && hoveredTask.index === `${item.epicId}` && (
                            <div
                              className="absolute top-[-1.5rem] left-0 bg-black text-white text-xs p-1 rounded w-[160px] text-center">
                              {hoveredTask.range}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>

                  {expandedRows.includes(item.epicId) && item.ticket.map((subItem) => {
                    const subPosition = calculatePositionAndWidth(subItem.createdDate, subItem.dueDate)
                    return (
                      <tr key={subItem.ticketId}>
                        <td colSpan={months.length} className="relative p-2 border">
                          <div className="relative w-full h-6 bg-gray-200">
                            <div
                              className="absolute h-full bg-blue-400"
                              style={subPosition}
                              onMouseEnter={() =>
                                setHoveredTask({
                                  range: `${subItem.createdDate.replace('-', '.')} - ${subItem.dueDate.replace('-', '.')}`,
                                  index: `${item.epicId}-${subItem.ticketId}` // Use epicId and ticketId for uniqueness
                                })
                              }
                              onMouseLeave={() => setHoveredTask({range: '', index: ''})}
                            >
                              {hoveredTask.range && hoveredTask.index === `${item.epicId}-${subItem.ticketId}` && (
                                <div
                                  className="absolute top-[-1.5rem] left-0 bg-black text-white text-xs p-1 rounded w-[160px] text-center">
                                  {hoveredTask.range}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </Fragment>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GanttContainer
