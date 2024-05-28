import { Avatar, SvgIcon, styled } from '@mui/material'

// import Image from 'next/image'
import { Account } from 'mdi-material-ui'

const StyledAvatar = styled(Avatar)(({}: any) => ({}))

interface ImageAvatarProps {
  path: string
  alt: string
  width: number
  height: number
}

export const ImageAvatar: React.FC<ImageAvatarProps> = ({ path, alt, width, height }) => {
  return (
    <StyledAvatar sx={{ width, height }} alt='image'>
      {path ? (
        <img src={path} alt={alt} width={width} height={height} />
      ) : (
        <SvgIcon>
          <Account />
        </SvgIcon>
      )}
    </StyledAvatar>
  )
}
