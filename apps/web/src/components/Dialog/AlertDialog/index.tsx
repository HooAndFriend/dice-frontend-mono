// ** React Imports
import { Fragment } from 'react'

// ** ui Imports
import { Dialog, Transition } from '@headlessui/react'
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { DialogType, LogLevel } from '@/src/type/component'

interface PropsType {
  title: string
  message: string
  buttonText: string
  logLevel: LogLevel
  open: boolean
  cancelButtonRef: any
  type: DialogType
  comfirmButtonText: string
  setOpen: (open: boolean) => void
}

const AlertDialog = ({
  open,
  setOpen,
  cancelButtonRef,
  title,
  message,
  buttonText,
  logLevel,
  comfirmButtonText,
  type,
}: PropsType) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-[8px] shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                        logLevel === 'info' ? 'bg-green-100' : 'bg-red-100'
                      } sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      {logLevel === 'warn' && (
                        <ExclamationTriangleIcon
                          className="w-6 h-6 text-red-600"
                          aria-hidden="true"
                        />
                      )}
                      {logLevel === 'info' && (
                        <InformationCircleIcon
                          className="w-6 h-6 text-green-600"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md ${
                      logLevel === 'info' ? 'bg-green-600' : 'bg-red-600'
                    } px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                      logLevel === 'info'
                        ? 'hover:bg-green-500'
                        : 'hover:bg-red-500'
                    } sm:ml-3 sm:w-auto`}
                    onClick={() => setOpen(false)}
                  >
                    {buttonText}
                  </button>
                  {type === 'comfirm' && (
                    <button
                      type="button"
                      className={`inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-5 sm:ml-3 sm:w-auto`}
                      onClick={() => setOpen(false)}
                    >
                      {comfirmButtonText}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AlertDialog
