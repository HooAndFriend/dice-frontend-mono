// ** Type Imports
import { TicketHistory, TicketHistoryType } from '@/src/type/ticket'

// ** Utils Imports
import dayjs from 'dayjs'
import Image from 'next/image'

interface PropsType {
  data: TicketHistory
}

const getLogTitle = (type: TicketHistoryType) => {
  switch (type) {
    case 'UPDATE_NAME':
      return '이름을 변경했습니다.'

    case 'UPDATE_SP':
      return '스토리 포인트를 변경했습니다.'

    case 'UPDATE_CONTENT':
      return '내용을 변경했습니다.'

    case 'UPDATE_WORKER':
      return '담당자를 변경했습니다.'

    case 'UPDATE_ADMIN':
      return '관리자를 변경했습니다.'

    case 'UPDATE_STATUS':
      return '상태를 변경했습니다.'

    case 'UPDATE_DUE_DATE':
      return '마감일을 변경했습니다.'

    case 'UPDATE_TYPE':
      return '타입을 변경했습니다.'

    case 'ADD_COMMENT':
      return '댓글을 추가했습니다.'

    case 'UPDATE_COMMENT':
      return '댓글을 수정했습니다.'

    case 'DELETE_COMMENT':
      return '댓글을 삭제했습니다.'

    case 'ADD_FILE':
      return '파일을 추가했습니다.'

    case 'DELETE_FILE':
      return '파일을 삭제했습니다.'
  }
}

const TicketHistoryItem = ({ data }: PropsType) => {
  return (
    <div className="w-full mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="rounded-[15px] border border-lightGray mr-[10px]"
            alt="profile"
            src={data?.creatorProfile || '/image/dice.png'}
            width={30}
            height={30}
          />
          <div className="flex font-spoqa">
            <div className="mr-[10px] text-[16px]">
              {data?.creatorNickname || ''}
            </div>
            <div className="flex items-center text-darkGray text-[12px]">
              {dayjs(data.createdDate).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-[41px] mt-[9px] text-[16px]">
        {getLogTitle(data.type)}
      </div>
      <div className="ml-[41px] mt-[9px] bg-[#F3F3F3] px-[11px] py-[9px] rounded-[5px] text-[#404040] text-[14px]">
        {['UPDATE_ADMIN', 'UPDATE_WORKER'].includes(data.type) ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Image
                className="rounded-[15px] border border-lightGray mr-[10px]"
                alt="profile"
                src={data?.creatorProfile || '/image/dice.png'}
                width={30}
                height={30}
              />
              <div className="flex font-spoqa">
                <div className="mr-[10px] text-[16px]">
                  {data?.creatorNickname || ''}
                </div>
              </div>
            </div>
            <h1> {`->`} </h1>
            <div className="flex items-center">
              <Image
                className="rounded-[15px] border border-lightGray mr-[10px]"
                alt="profile"
                src={data?.creatorProfile || '/image/dice.png'}
                width={30}
                height={30}
              />
              <div className="flex font-spoqa">
                <div className="mr-[10px] text-[16px]">
                  {data?.creatorNickname || ''}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>{`${data.beforeLog} -> ${data.afterLog}`}</div>
        )}
      </div>
    </div>
  )
}

export default TicketHistoryItem
