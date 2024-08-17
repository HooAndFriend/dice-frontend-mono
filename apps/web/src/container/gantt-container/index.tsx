'use client'

import { Fragment, useState } from 'react'
import dayjs from 'dayjs'

interface PropsType {}

const GanttContainer = ({}: PropsType) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([])

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

  const tasks = [
    {
      title: 'TMTW-5 메인 - Main',
      duration: '50%',
      subTasks: [
        { title: 'Subtask 1', duration: '30%' },
        { title: 'Subtask 2', duration: '20%' },
      ],
    },
    {
      title: 'TMTW-16 구매 - purchasing',
      duration: '25%',
      subTasks: [{ title: 'Subtask 1', duration: '25%' }],
    },
    {
      title: 'TMTW-20 판매 - Selling',
      duration: '75%',
      subTasks: [{ title: 'Subtask 1', duration: '75%' }],
    },
    {
      title: 'TMTW-2 사용자 인증 및 정보 - user info and approval',
      duration: '80%',
      subTasks: [
        { title: 'Subtask 1', duration: '40%' },
        { title: 'Subtask 2', duration: '40%' },
      ],
    },
    { title: 'TMTW-4 회원가입 - sign up', duration: '33%' },
    { title: 'TMTW-9 프로필 - profile', duration: '66%' },
    {
      title: 'TMTW-11 타임 콘텐츠 - time contents(product)',
      duration: '60%',
    },
    { title: 'TMTW-14 tispace', duration: '25%' },
    { title: 'TMTW-6 운영 - management', duration: '80%' },
    { title: 'TMTW-521 API', duration: '50%' },
  ]

  return (
    <div className="bg-white mt-6 p-6 rounded-lg w-full overflow-x-auto relative">
      <div className="flex">
        {/* 티켓 테이블 */}
        <table className="bg-white border-collapse table-fixed min-w-[400px] h-[45px]">
          <thead>
            <tr>
              <th className="p-2 text-left bg-white border min-w-[300px]">
                스프린트
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 bg-white border min-w-[300px]">릴리즈</td>
            </tr>
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
                      <td className="p-2 pl-10 bg-white border min-w-[300px]">
                        {subItem.title}
                      </td>
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
                  <th
                    key={index}
                    className="p-2 text-center bg-white border min-w-[200px]"
                  >
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={months.length} className="relative p-2 border">
                  <div className="relative w-full h-6 bg-gray-200">
                    <div
                      className="absolute h-full bg-purple-400"
                      style={{ width: '75%', left: '25%' }}
                    >
                      <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full px-2">
                        <span className="text-xs text-white">
                          {dayjs()
                            .subtract(1, 'year')
                            .startOf('month')
                            .format('YYYY-MM-DD')}
                        </span>
                        <span className="text-xs text-white">
                          {dayjs()
                            .add(1, 'year')
                            .endOf('month')
                            .format('YYYY-MM-DD')}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {tasks.map((item, index) => (
                <Fragment key={index}>
                  <tr>
                    <td colSpan={months.length} className="relative p-2 border">
                      <div className="relative w-full h-6 bg-gray-200">
                        <div
                          className="absolute h-full bg-purple-400"
                          style={{ width: item.duration }}
                        />
                      </div>
                    </td>
                  </tr>
                  {expandedRows.includes(index) &&
                    item.subTasks &&
                    item.subTasks.map((subItem, subIndex) => (
                      <tr key={subIndex}>
                        <td
                          colSpan={months.length}
                          className="relative p-2 border"
                        >
                          <div className="relative w-full h-6 bg-gray-200">
                            <div
                              className="absolute h-full bg-blue-400"
                              style={{ width: subItem.duration }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GanttContainer
