import { ButtonBase, ButtonBaseProps } from '@mui/material'
import { merge } from 'lodash'

export interface ButtonTypes extends ButtonBaseProps {
  text: string
  size: 'sm' | 'lg'
  customColor?: string
  customMt?: string
}

export function Button(props: ButtonTypes) {
  const { text, sx, size, customMt = '40px', ...buttonProps } = props
  return (
    <ButtonBase
      {...buttonProps}
      sx={merge(sx, {
        height: size === 'sm' ? 40 : 60,
        minHeight: size === 'sm' ? 40 : 60,
        background: '#1c9ad6',
        borderRadius: size === 'sm' ? '8px' : '12px',
        fontWeight: size === 'sm' ? 500 : 700,
        fontSize: size === 'sm' ? 14 : 18,
        color: '#ffffff',
        marginTop: size === 'sm' ? 'unset' : customMt,
        '&:disabled': {
          background: '#dddddd',
          color: '#ffffff',
        },
      })}
    >
      {text}
    </ButtonBase>
  )
}

export function OutlinedButton(props: ButtonTypes) {
  const {
    text,
    sx,
    size,
    customMt = '40px',
    customColor,
    ...buttonProps
  } = props
  return (
    <ButtonBase
      {...buttonProps}
      sx={merge(sx, {
        height: size === 'sm' ? 40 : 60,
        minHeight: size === 'sm' ? 40 : 60,
        border: `1px solid ${customColor ? customColor : '#1C9AD6'}`,
        borderRadius: size === 'sm' ? '8px' : '12px',
        fontWeight: size === 'sm' ? 500 : 700,
        fontSize: size === 'sm' ? 14 : 18,
        color: customColor ? customColor : '#1C9AD6',
        marginTop: size === 'sm' ? 'unset' : customMt,
        '&:disabled': {
          border: '1px solid #dddddd',
          background: 'unset',
          color: '#dddddd',
        },
      })}
    >
      {text}
    </ButtonBase>
  )
}
