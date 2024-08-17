import { TicketSettingType } from '@/src/type/ticket'

export const getTicketSettingImage = (
  value: TicketSettingType,
  url?: string,
) => {
  switch (value) {
    case 'BLACK':
      return {
        url: '/svg/ticket-setting/black.svg',
        color: '#565656',
      }

    case 'BLUE':
      return {
        url: '/svg/ticket-setting/blue.svg',
        color: '#0033FF',
      }

    case 'GREEN':
      return {
        url: '/svg/ticket-setting/green.svg',
        color: '#89E6AD',
      }

    case 'PURPLE':
      return {
        url: '/svg/ticket-setting/purple.svg',
        color: '#623AD6',
      }

    case 'RED':
      return {
        url: '/svg/ticket-setting/red.svg',
        color: '#FF0000',
      }

    case 'YELLOW':
      return {
        url: '/svg/ticket-setting/yellow.svg',
        color: '#FEAF06',
      }

    case 'PINK':
      return {
        url: '/svg/ticket-setting/pink.svg',
        color: '#FF006F',
      }

    default:
      return {
        url,
        color: '#DDDDDD',
      }
  }
}
