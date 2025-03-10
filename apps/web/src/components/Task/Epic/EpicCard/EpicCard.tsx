// ** React Imports
import { ChangeEvent, KeyboardEvent } from 'react'

// ** Type Imports
import { RoleType } from '@/src/type/common'
import { EpicDetail, EpicEditMode } from '@/src/type/epic'

// ** Components Imports
import QuillEditor from '../../../QuillEditor'
import SubTicketItem from '../../Ticket/SubTicketItem'

interface PropsType {
  data: EpicDetail
  mode: EpicEditMode
  role: RoleType
  setData: (value: EpicDetail) => void
  handleClose: () => void
  setMode(mode: EpicEditMode): void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleUpdateEpic: (type: 'content' | 'name') => void
  handleDeleteEpic: () => void
  handleEnter: (e: KeyboardEvent<HTMLInputElement>) => void
}

const EpicCardView = ({
  data,
  mode,
  role,
  setMode,
  onChange,
  setData,
  handleClose,
  handleUpdateEpic,
  handleDeleteEpic,
  handleEnter,
}: PropsType) => {
  return (
    <div className="h-full overflow-y-auto w-full bg-white rounded-[20px] shadow-md p-[24px] overflow-x-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-[18px] font-bold">{data.code}</h1>
        </div>
        <div className="flex items-center">
          <p
            className="text-[12px] text-gray-500 cursor-pointer underline"
            onClick={handleDeleteEpic}
          >
            Delete
          </p>
          <h1
            className="text-[24px] font-bold cursor-pointer ml-4"
            onClick={handleClose}
          >
            X
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-between mt-[30px]">
        {mode.name === 'view' ? (
          <h1
            onDoubleClick={() => {
              if (role === 'VIEWER') return
              setMode({ ...mode, name: 'edit' })
            }}
            className="h-full cursor-pointer min-w-1/2 text-[16px]"
          >
            {data.name.length === 0 ? '-' : data.name}
          </h1>
        ) : (
          <div className="flex items-center w-full font-bold">
            <input
              type="text"
              value={data.name}
              name="name"
              onChange={onChange}
              className="w-full h-[40px] border border-[#EBEBEC] rounded-[10px] px-4"
              onKeyDown={handleEnter}
            />
            <div className="flex items-center mx-2">
              <button
                className="w-[30px] h-[30px] bg-[#623AD6] text-white rounded-[8px] flex items-center justify-center mr-2"
                onClick={() => handleUpdateEpic('name')}
              >
                V
              </button>
              <button
                className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center"
                onClickCapture={() => setMode({ ...mode, name: 'view' })}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
      <h1 className="my-4 text-[16px]">Content</h1>
      {mode.content === 'view' ? (
        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="p-4 border border-[#EBEBEC] h-[80px] w-full rounded-[10px] overflow-y-auto text-[16px]"
          onDoubleClick={() => {
            if (role === 'VIEWER') return
            setMode({ ...mode, content: 'edit' })
          }}
        />
      ) : (
        <div>
          <QuillEditor
            value={data.content}
            onChange={(value: string) => {
              setData({ ...data, content: value } as EpicDetail)
            }}
            name="asIs"
          />
          <div className="flex items-center mt-2">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              onClick={() => handleUpdateEpic('content')}
            >
              save
            </button>
            <button
              className="w-[60px] h-[30px] flex items-center justify-center rounded-[8px]"
              onClickCapture={() => setMode({ ...mode, content: 'view' })}
            >
              cancel
            </button>
          </div>
        </div>
      )}
      <h1 className="my-4 text-[16px]">Tickets</h1>
      <div className="w-full ">
        {data.ticket.map((ticket) => (
          <div className="mb-[10px]">
            <SubTicketItem
              key={ticket.ticketId}
              ticket={ticket}
              isChildren={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EpicCardView
