// ** Components Imports
import CustomInput from '../../../Input/CustomInput'
import TicketStatusButton from '../TicketStatusButton'
import QuillEditor from '../../../QuillEditor'
import TicketDatePicker from '../TicketDatePicker'
import TicketFileUploader from '../TicketFileUploader'
import TicketUserButton from '../TicketUserButton'
import TicketSettingButton from '../TicketSettingButton'

// ** Type Imports
import { TicketEditMode, TicketInfo } from '@/src/type/ticket'
import { RoleType } from '@/src/type/common'

// ** Utils Imports
import dayjs from 'dayjs'
import TicketComment from '../TicketComment'
import TicketHistory from '../TicketHistory'
import ImagePreview from '../../../Image/ImagePreview'
import { KeyboardEvent } from 'react'
import SubTicketItem from '../SubTicketItem'
import TicketLink from '../TicketLink'

interface PropsType {
  data: TicketInfo
  mode: TicketEditMode
  role: RoleType
  subType: 'comment' | 'history'
  selectImage: string
  previewOpen: boolean
  linkOpen: boolean
  cancelButtonRef: any
  setSubType: (type: 'comment' | 'history') => void
  setPreviewOpen: (open: boolean) => void
  setLinkOpen: (open: boolean) => void
  setMode: (mode: TicketEditMode) => void
  setData: (data: TicketInfo) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ticketRefetch: () => void
  handleClose: () => void
  handleDeleteTicket: (id: number) => void
  handleDeleteTicketFile: (id: number) => void
  handleEnter: (
    e: KeyboardEvent<HTMLInputElement>,
    type: 'content' | 'name',
  ) => void
  handleUpdateTicket: (value: 'content' | 'name' | 'storypoint') => void
  handlePreviewOpen: (image: string) => void
}

const TicketCardView = ({
  data,
  role,
  mode,
  subType,
  selectImage,
  previewOpen,
  cancelButtonRef,
  linkOpen,
  setSubType,
  onChange,
  setData,
  setMode,
  setPreviewOpen,
  handleClose,
  ticketRefetch,
  handleDeleteTicket,
  handleDeleteTicketFile,
  handleUpdateTicket,
  handlePreviewOpen,
  handleEnter,
  setLinkOpen,
}: PropsType) => {
  return (
    <div className="h-full overflow-y-auto w-full bg-white rounded-[20px] shadow-md p-[24px] overflow-x-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TicketSettingButton data={data} isText={false} />
          <h1 className="ml-4 text-[18px] font-bold">{data.code}</h1>
        </div>
        <div className="flex items-center">
          <p
            className="text-[12px] text-gray-500 cursor-pointer underline"
            onClick={() => handleDeleteTicket(data.ticketId)}
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
              onKeyDown={(e) => handleEnter(e, 'name')}
            />
            <div className="flex items-center mx-2">
              <button
                className="w-[30px] h-[30px] bg-[#623AD6] text-white rounded-[8px] flex items-center justify-center mr-2"
                onClick={() => handleUpdateTicket('name')}
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
        <TicketStatusButton status={data.status} ticketId={data.ticketId} />
      </div>
      <hr className="my-[20px]" />
      <div className="flex items-center mt-[20px]">
        <div className="flex items-center w-1/2">
          <div className="w-[110px]">
            <h1 className="text-[16px]">Worker</h1>
          </div>
          <div className="flex items-center">
            <TicketUserButton
              profile={data.worker ? data.worker.profile : '/images/dice.png'}
              ticketId={data.ticketId}
              email={data.worker ? data.worker.email : '-'}
              nickname={data.worker ? data.worker.nickname : '-'}
              userId={data.worker ? data.worker.userId : 0}
              type="user"
              isNickname={true}
            />
          </div>
        </div>
        <div className="flex items-center w-1/2">
          <div className="w-[110px]">
            <h1 className="text-[16px]">Admin</h1>
          </div>
          <div className="flex items-center">
            <h3 className="text-[16px]">
              <TicketUserButton
                profile={data.admin ? data.admin.profile : '/images/dice.png'}
                ticketId={data.ticketId}
                email={data.admin ? data.admin.email : '-'}
                nickname={data.admin ? data.admin.nickname : '-'}
                userId={data.admin ? data.admin.userId : 0}
                type="admin"
                isNickname={true}
              />
            </h3>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-[20px]">
        <h1 className="w-[110px] text-[16px]">DueDate</h1>
        <TicketDatePicker
          ticketId={data.ticketId}
          value={data.dueDate ? dayjs(data.dueDate).format('YYYY-MM-DD') : ''}
        />
      </div>
      <hr className="my-[20px]" />
      <h1 className="my-4 text-[16px]">Content</h1>
      {mode.content === 'view' ? (
        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="p-4 border border-[#EBEBEC] min-h-[80px] w-full rounded-[10px] overflow-y-auto text-[16px] cursor-pointer"
          onDoubleClick={() => {
            if (role === 'VIEWER') return
            setMode({ ...mode, content: 'edit' })
          }}
        />
      ) : (
        <div>
          <QuillEditor
            value={data.content}
            onChange={(value: string) =>
              setData({ ...data, content: value } as TicketInfo)
            }
            name="asIs"
          />
          <div className="flex items-center mt-2">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              onClick={() => handleUpdateTicket('content')}
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
      <h1 className="my-4 text-[16px]">Story Point</h1>
      {mode.storypoint === 'view' ? (
        <div
          className="h-[40px] rounded-[10px] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4 cursor-pointer text-[16px]"
          onDoubleClick={() => {
            if (role === 'VIEWER') return
            setMode({ ...mode, storypoint: 'edit' })
          }}
        >
          {data.storypoint}
        </div>
      ) : (
        <div>
          <CustomInput
            width="480px"
            height="40px"
            borderRadius="10px"
            value={data.storypoint}
            name="storypoint"
            type="number"
            onChange={onChange}
          />
          <div className="flex items-center mt-2">
            <button
              className="w-[60px] h-[30px] flex items-center justify-center text-white bg-[#623AD6] rounded-[8px] mr-2"
              onClick={() => handleUpdateTicket('storypoint')}
            >
              save
            </button>
            <button
              className="w-[60px] h-[30px] flex items-center justify-center rounded-[8px]"
              onClickCapture={() => setMode({ ...mode, storypoint: 'view' })}
            >
              cancel
            </button>
          </div>
        </div>
      )}

      <h1 className="my-4 text-[16px]">File</h1>
      <div className="flex items-center">
        {data.ticketFile.length < 4 && (
          <TicketFileUploader
            ticketId={data.ticketId}
            refetch={ticketRefetch}
          />
        )}
        {data.ticketFile.map((item) => (
          <div
            className="relative w-[40px] h-[40px] mr-4"
            onClick={() => handlePreviewOpen(item.url)}
          >
            <img
              src={item.url}
              alt="Description"
              className="absolute inset-0 w-full h-full rounded-[6px] bg-[#D9E0FF] cursor-pointer"
            />
            <h1
              className="absolute px-2 py-1 m-1 text-xs leading-none text-white bg-black rounded-[11px] cursor-pointer -right-2 -top-2"
              onClick={() => handleDeleteTicketFile(item.ticketFileId)}
            >
              X
            </h1>
          </div>
        ))}
      </div>
      <div>
        {data.parentLink.length > 0 && (
          <h1 className="my-4 text-[16px]">Linked Parent Ticket</h1>
        )}
        <div>
          {data.parentLink.map((ticket) => (
            <div className="mb-[10px]">
              <SubTicketItem
                key={ticket.ticketLinkId}
                ticket={ticket.parentTicket}
                isChildren={false}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <h1 className="my-4 text-[16px]">Linked Child Ticket</h1>
          <div
            className=" px-[8px] h-[24px] ml-4 rounded-[6px] bg-[#D9E0FF] flex items-center justify-center cursor-pointer text-[12px]"
            onClick={() => setLinkOpen(true)}
          >
            Add Child Ticket
          </div>
        </div>
        {linkOpen && (
          <TicketLink
            ticketId={data.ticketId}
            setLinkOpen={setLinkOpen}
            ticketRefetch={ticketRefetch}
          />
        )}
      </div>

      <div>
        {data.childLink.map((ticket) => (
          <div className="mb-[10px]">
            <SubTicketItem
              key={ticket.ticketLinkId}
              ticketLinkId={ticket.ticketLinkId}
              ticket={ticket.childTicket}
              isChildren={true}
              ticketRefetch={ticketRefetch}
            />
          </div>
        ))}
      </div>

      <div className="mt-[12px]">
        <p className="text-[12px] text-gray-400">
          created : {dayjs(data.createdDate).format('YYYY.MM.DD HH:mm:ss')}
        </p>
        <p className="text-[12px] text-gray-400">
          modified : {dayjs(data.modifiedDate).format('YYYY.MM.DD HH:mm:ss')}
        </p>
      </div>
      <hr className="mb-[20px] mt-[10px]" />
      <div className="flex items-center">
        <button
          className="text-[12px] px-2 h-[30px] rounded-[8px] mr-2"
          style={{
            backgroundColor: subType === 'comment' ? '#623AD6' : 'white',
            color: subType === 'comment' ? 'white' : '#623AD6',
          }}
          onClick={() => setSubType('comment')}
        >
          comment
        </button>
        <button
          className="text-[12px] px-2 h-[30px] rounded-[8px]"
          style={{
            backgroundColor: subType === 'history' ? '#623AD6' : 'white',
            color: subType === 'history' ? 'white' : '#623AD6',
          }}
          onClick={() => setSubType('history')}
        >
          history
        </button>
      </div>
      {subType === 'comment' ? (
        <TicketComment ticketId={data.ticketId} />
      ) : (
        <TicketHistory ticketId={data.ticketId} />
      )}
      {previewOpen && (
        <ImagePreview
          open={previewOpen}
          setOpen={setPreviewOpen}
          image={selectImage}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  )
}

export default TicketCardView
