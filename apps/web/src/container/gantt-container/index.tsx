'use client'

import { Fragment, useState } from 'react'
import dayjs from 'dayjs'

interface PropsType {}

const GanttContainer = ({}: PropsType) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [hoveredTask, setHoveredTask] = useState<{ range: string | null, index: string | null }>({
    range: null,
    index: null,
  })

  const getMonthlyRange = () => {
    const startDate = dayjs().subtract(1, 'year').startOf('month')
    const endDate = dayjs().add(1, 'year').endOf('month')

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

  const months = getMonthlyRange()

  const toggleRow = (index: number) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((row) => row !== index))
    } else {
      setExpandedRows([...expandedRows, index])
    }
  }

  const calculatePositionAndWidth = (taskStartDate: string, taskEndDate: string) => {
    const startDate = dayjs().subtract(1, 'year').startOf('month')
    const endDate = dayjs().add(1, 'year').endOf('month')

    const taskStart = dayjs(taskStartDate)
    const taskEnd = dayjs(taskEndDate)

    const totalDays = endDate.diff(startDate, 'day')
    const taskStartOffset = taskStart.diff(startDate, 'day')
    const taskDuration = taskEnd.diff(taskStart, 'day')

    const left = (taskStartOffset / totalDays) * 100
    const width = (taskDuration / totalDays) * 100

    return { left: `${left}%`, width: `${width}%` }
  }

  const tasks = [
    {
      title: '릴리즈',
      startDate: '2023.08.01',
      endDate: '2025.01.01',
    },
    {
      title: 'TMTW-5 메인 - Main',
      startDate: '2023.08.13',
      endDate: '2023.09.01',
      subTasks: [
        { title: 'Subtask 1', startDate: '2023.08.15', endDate: '2023.08.23' },
        { title: 'Subtask 2', startDate: '2023.08.15', endDate: '2023.08.23' },
      ],
    },
    {
      title: 'TMTW-16 구매 - purchasing',
      startDate: '2023.08.31',
      endDate: '2023.09.13',
      subTasks: [{ title: 'Subtask 1', startDate: '2023.09.01', endDate: '2023.09.10' }],
    },
    {
      title: 'TMTW-20 판매 - Selling',
      startDate: '2023.08.31',
      endDate: '2023.09.13',
      subTasks: [{ title: 'Subtask 1', startDate: '2023.09.01', endDate: '2023.09.10' }],
    },
    {
      title: 'TMTW-2 사용자 인증 및 정보 - user info and approval',
      startDate: '2023.08.31',
      endDate: '2023.09.13',
      subTasks: [
        { title: 'Subtask 1', startDate: '2023.09.01', endDate: '2023.09.10' },
        { title: 'Subtask 2', startDate: '2023.09.01', endDate: '2023.09.10' },
      ],
    },
    { title: 'TMTW-4 회원가입 - sign up', startDate: '2023.09.01', endDate: '2023.09.10' },
    { title: 'TMTW-9 프로필 - profile', startDate: '2023.09.01', endDate: '2023.09.10' },
    {
      title: 'TMTW-11 타임 콘텐츠 - time contents(product)',
      startDate: '2023.09.01',
      endDate: '2023.09.10',
    },
    { title: 'TMTW-14 tispace', startDate: '2023.09.01', endDate: '2023.09.10' },
    { title: 'TMTW-6 운영 - management', startDate: '2023.09.01', endDate: '2023.09.10' },
    { title: 'TMTW-521 API', startDate: '2023.09.01', endDate: '2023.09.10' },
  ]

  return (
      <div className="bg-white mt-6 p-6 rounded-lg w-full overflow-x-auto relative">
        <div className="flex">
          {/* 티켓 테이블 */}
          <table className="bg-white border-collapse table-fixed min-w-[400px] h-[45px]">
            <thead>
            <tr>
              <th className="p-2 text-left bg-white border min-w-[300px]">스프린트</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((item, index) => (
                <Fragment key={index}>
                  <tr>
                    <td
                        className="p-2 bg-white border cursor-pointer min-w-[300px]"
                        onClick={() => toggleRow(index)}
                    >
                      {item.title}
                    </td>
                  </tr>
                  {expandedRows.includes(index) &&
                      item.subTasks &&
                      item.subTasks.map((subItem, subIndex) => (
                          <tr key={subIndex}>
                            <td className="p-2 pl-10 bg-white border min-w-[300px]">{subItem.title}</td>
                          </tr>
                      ))}
                </Fragment>
            ))}
            </tbody>
          </table>

          {/* 날짜 테이블을 스크롤 가능하게 감싸는 div */}
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
              {tasks.map((item, index) => {
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
                                      range: `${item.startDate} - ${item.endDate}`,
                                      index: `${index}`
                                    })
                                }
                                onMouseLeave={() => setHoveredTask({ range: null, index: null })}
                            >
                              {hoveredTask.range && hoveredTask.index === `${index}` && (
                                  <div className="absolute top-[-1.5rem] left-0 bg-black text-white text-xs p-1 rounded">
                                    {hoveredTask.range}
                                  </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                      {expandedRows.includes(index) &&
                          item.subTasks &&
                          item.subTasks.map((subItem, subIndex) => {
                            const subPosition = calculatePositionAndWidth(subItem.startDate, subItem.endDate)
                            return (
                                <tr key={subIndex}>
                                  <td colSpan={months.length} className="relative p-2 border">
                                    <div className="relative w-full h-6 bg-gray-200">
                                      <div
                                          className="absolute h-full bg-blue-400"
                                          style={subPosition}
                                          onMouseEnter={() =>
                                              setHoveredTask({
                                                range: `${subItem.startDate} - ${subItem.endDate}`,
                                                index: `${index}-${subIndex}`
                                              })
                                          }
                                          onMouseLeave={() => setHoveredTask({ range: null, index: null })}
                                      >
                                        {hoveredTask.range && hoveredTask.index === `${index}-${subIndex}` && (
                                            <div className="absolute top-[-1.5rem] left-0 bg-black text-white text-xs p-1 rounded">
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
