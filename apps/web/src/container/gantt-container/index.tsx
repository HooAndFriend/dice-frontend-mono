'use client'

import { Fragment, useState } from 'react'
import dayjs from 'dayjs'

// ** Type Imports
import {EpicWithDates} from '@/src/type/epic'

interface PropsType {
  data: EpicWithDates[]
}

const GanttContainer = ({data}: PropsType) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [hoveredTask, setHoveredTask] = useState<{ range: string | null, index: string | null }>({
    range: null,
    index: null,
  })

  const getMonthlyRange = (earliestDate, latestDate) => {
    const startDate = dayjs(earliestDate).startOf('month')
    const endDate = dayjs(latestDate).endOf('month');

    const months = []

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
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((row) => row !== index))
    } else {
      setExpandedRows([...expandedRows, index])
    }
  }

  let startMonth = null;
  let endMonth = null;

  data.forEach(epic => {
    let earliestCreatedDate = null;
    let latestDueDate = null;
    epic.ticket.forEach(ticket => {
      ticket.createdDate = ticket.createdDate.substring(0,10)

      if (!earliestCreatedDate || ticket.createdDate < earliestCreatedDate) {
        earliestCreatedDate = ticket.createdDate;
      }
      if (!startMonth || ticket.createdDate < startMonth) {
        startMonth = ticket.createdDate;
      }


      if (!latestDueDate || ticket.dueDate > latestDueDate) {
        latestDueDate = ticket.dueDate;
      }
      if (!endMonth || ticket.dueDate > endMonth) {
        endMonth = ticket.dueDate;
      }
    })
    epic.startDate = earliestCreatedDate
    epic.endDate = latestDueDate
  })
  const months = getMonthlyRange(startMonth, endMonth)

  const calculatePositionAndWidth = (taskStartDate: string, taskEndDate: string) => {
    const startDate = dayjs(months[0].replace('.','-'), 'YYYY.M').startOf('month')
    const endDate = dayjs(months[months.length-1].replace('.','-'), 'YYYY.M').endOf('month')
    const taskStart = dayjs(taskStartDate)
    const taskEnd = dayjs(taskEndDate)

    const totalDays = endDate.diff(startDate, 'day') + 1
    const taskStartOffset = taskStart.diff(startDate, 'day')
    const taskDuration = taskEnd.diff(taskStart, 'day') + 1 // Add 1 to include the end date
    console.log(taskStartOffset, taskDuration, totalDays)
    const left = (taskStartOffset / totalDays) * 100
    const width = (taskDuration / totalDays) * 100
    console.log(left, width)


    return { left: `${left}%`, width: `${width}%` }
  }

  return (
      <div className="bg-white mt-6 p-6 rounded-lg w-full">
        <div className="flex">
          <div className="flex overflow-x-auto">
            <table className="bg-white border-collapse table-fixed w-[350px]">
              <thead>
              <tr>
                <th className="p-2 text-left bg-white border w-[350px]">스프린트</th>
              </tr>
              </thead>
              <tbody className="max-h-[45px]">
              {data.map((item, index) => (
                <Fragment key={index}>
                  <tr>
                    <td
                      className="p-2 bg-white border cursor-pointer w-[350px]"
                      onClick={() => toggleRow(index)}
                    >
                      {item.code + ' ' + item.name}
                    </td>
                  </tr>
                  {expandedRows.includes(index) &&
                    item.ticket &&
                    item.ticket.map((subItem, subIndex) => (
                      <tr key={subIndex}>
                        <td className="p-2 pl-10 bg-white border min-w-[300px]">{subItem.code + ' ' + subItem.name}</td>
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
                {months.map((month, index) => (
                  <th key={index} className="p-2 text-center bg-white border min-w-[200px]">
                    {month}
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {data.map((item, index) => {
                const position = calculatePositionAndWidth(item.startDate, item.endDate)
                return (
                  <Fragment key={index}>
                    <tr>
                      <td colSpan={months.length} className="relative p-2 border">
                        <div className="relative w-full h-6 bg-gray-200">
                          <div
                            className="absolute h-full bg-purple-400"
                            style={position}
                            onMouseEnter={() =>
                              setHoveredTask({
                                range: `${item.startDate.replace('-', '.')} - ${item.endDate.replace('-', '.')}`,
                                index: `${index}`
                              })
                            }
                            onMouseLeave={() => setHoveredTask({range: null, index: null})}
                          >
                            {hoveredTask.range && hoveredTask.index === `${index}` && (
                              <div
                                className="absolute top-[-1.5rem] left-0 bg-black text-white text-xs p-1 rounded w-[160px] text-center">
                                {hoveredTask.range}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    {expandedRows.includes(index) &&
                      item.ticket &&
                      item.ticket.map((subItem, subIndex) => {
                        const subPosition = calculatePositionAndWidth(subItem.createdDate, subItem.dueDate)
                        return (
                          <tr key={subIndex}>
                            <td colSpan={months.length} className="relative p-2 border">
                              <div className="relative w-full h-6 bg-gray-200">
                                <div
                                  className="absolute h-full bg-blue-400"
                                  style={subPosition}
                                  onMouseEnter={() =>
                                    setHoveredTask({
                                      range: `${subItem.createdDate.replace('-', '.')} - ${subItem.dueDate.replace('-', '.')}`,
                                      index: `${index}-${subIndex}`
                                    })
                                  }
                                  onMouseLeave={() => setHoveredTask({range: null, index: null})}
                                >
                                  {hoveredTask.range && hoveredTask.index === `${index}-${subIndex}` && (
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
