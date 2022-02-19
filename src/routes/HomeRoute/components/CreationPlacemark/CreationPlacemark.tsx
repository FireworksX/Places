import { FC } from 'react'
import * as Styled from './styles'

interface CreationPlacemarkProps {
  className?: string
}

const CreationPlacemark: FC<CreationPlacemarkProps> = ({ className }) => {
  return (
    <Styled.Root className={className}>
      <svg
        width='60'
        height='68'
        viewBox='0 0 60 68'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <defs>
          <path
            d='M23.51 51.523a.5.5 0 0 1-.5.477c-.29 0-.51-.21-.52-.477-.145-3.168-1.756-5.217-4.832-6.147C7.53 42.968 0 33.863 0 23 0 10.297 10.297 0 23 0s23 10.297 23 23c0 10.863-7.53 19.968-17.658 22.376-3.076.93-4.687 2.98-4.83 6.147z'
            id='ae96eeecd750ec2a83543f00c9bc789d__b'
          ></path>
          <filter
            x='-21.7%'
            y='-15.4%'
            width='143.5%'
            height='138.5%'
            filterUnits='objectBoundingBox'
            id='ae96eeecd750ec2a83543f00c9bc789d__a'
          >
            <feGaussianBlur in='SourceGraphic' stdDeviation='3'></feGaussianBlur>
            <feOffset dy='2'></feOffset>
            <feComponentTransfer>
              <feFuncA type='linear' slope='.3'></feFuncA>
            </feComponentTransfer>
          </filter>
        </defs>
        <g fill='none' fillRule='evenodd'>
          <g fillRule='nonzero' transform='translate(7 5)' fill='currentColor'>
            <use
              filter='url(#ae96eeecd750ec2a83543f00c9bc789d__a)'
              xlinkHref='#ae96eeecd750ec2a83543f00c9bc789d__b'
            ></use>
            <use xlinkHref='#ae96eeecd750ec2a83543f00c9bc789d__b'></use>
          </g>
          <path d='M30 68c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' fill='#fff' fillRule='nonzero'></path>
          <path d='M30 66a2 2 0 1 0 .001-3.999A2 2 0 0 0 30 66z' fill='currentColor'></path>
        </g>
      </svg>
    </Styled.Root>
  )
}

export default CreationPlacemark
