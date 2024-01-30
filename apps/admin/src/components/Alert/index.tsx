import {
  Backdrop,
  BackdropProps,
  Box,
  InputBase,
  Typography,
} from '@mui/material'
import { ChangeEvent } from 'react'
import { CloseIcon } from '../icons/close'
import { OutlinedButton, Button } from '../Button'

interface PropTypes extends BackdropProps {
  title: string
  contents: string
  type: 'confirm' | 'input' | 'alert'
  placeholder?: string
  value?: string
  handleValue?(e: ChangeEvent<HTMLInputElement>): void
  action?(): void
  onClose(): void
}

export function Alert({
  title,
  contents,
  type,
  placeholder,
  value,
  handleValue,
  action,
  onClose,
  ...props
}: PropTypes) {
  return (
    <Backdrop onClick={onClose} {...props} sx={{ zIndex: 999 }}>
      <Box
        sx={{
          width: 488,
          padding: '32px',
          background: '#f7f8fa',
          borderRadius: '12px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#000000' }}>
            {title}
          </Typography>
          {type === 'input' && (
            <CloseIcon style={{ cursor: 'pointer' }} onClick={onClose} />
          )}
        </Box>
        <Box sx={{ borderTop: '1px solid #dddddd', margin: '32px 0' }} />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 20,
            color: '#555555',
            lineHeight: '25px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {contents}
        </Typography>
        {type === 'alert' ? (
          <Button
            text="확인"
            sx={{
              width: '100%',
            }}
            size="lg"
            onClick={onClose}
          />
        ) : type === 'confirm' ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              text="확인"
              sx={{
                width: 202,
              }}
              size="lg"
              onClick={action ? action : onClose}
            />
            <OutlinedButton
              text="취소"
              sx={{
                width: 202,
              }}
              size="lg"
              onClick={onClose}
            />
          </Box>
        ) : (
          <>
            <InputBase
              sx={{
                marginTop: '32px',
                background: '#ffffff',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: 16,
                fontWeight: 500,
                color: '#000000',
              }}
              placeholder={placeholder ? placeholder : '내용을 입력해주세요.'}
              value={value}
              onChange={handleValue}
            />
            <Button
              text="확인"
              sx={{
                width: '100%',
              }}
              size="lg"
              onClick={action ? action : onClose}
            />
          </>
        )}
      </Box>
    </Backdrop>
  )
}
