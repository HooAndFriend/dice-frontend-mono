'use client'

// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** ui Imports
import { Dialog, Transition } from '@headlessui/react'

import CustomImage from '../CustomImage'

interface PropsType {
  open: boolean
  cancelButtonRef: any
  image: string[]
  selectImage: string
  setOpen: (open: boolean) => void
}

const ImageMultiPreview = ({
  open,
  setOpen,
  cancelButtonRef,
  image,
  selectImage,
}: PropsType) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // 초기 selectImage 위치 설정
  useEffect(() => {
    const initialIndex = image.indexOf(selectImage)
    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex)
    }
  }, [selectImage, image])

  const handleNext = () => {
    if (currentIndex < image.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

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
        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
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
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-[8px] shadow-xl">
                <div className="relative flex items-center p-5 w-[1600px] h-[800px] bg-[#FAFAFB]">
                  {/* 좌측 버튼 */}
                  <button
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-md ${
                      currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                  >
                    ◀
                  </button>

                  {/* 이미지 */}
                  <CustomImage
                    src={image[currentIndex]}
                    width={1600}
                    height={800}
                    alt="image_preview"
                  />

                  {/* 우측 버튼 */}
                  <button
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-md ${
                      currentIndex === image.length - 1
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={handleNext}
                    disabled={currentIndex === image.length - 1}
                  >
                    ▶
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ImageMultiPreview
