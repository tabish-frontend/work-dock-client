import { Dialog } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { AlertOctagon } from 'mdi-material-ui'

import type { FC } from 'react'

interface ConfirmationModalProps {
  onConfirm: () => void
  onCancel: () => void
  modal: boolean
  warning_title: string
  warning_text: string
  button_text: string
  modal_color?: string
}
export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  modal,
  warning_title,
  warning_text,
  button_text,
  modal_color = 'error'
}) => (
  <Dialog fullWidth maxWidth='sm' open={modal} onClose={onCancel}>
    <Paper elevation={12} sx={{ py: 3 }}>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          display: 'flex',
          p: 3
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            padding: 1,
            width: '40px',
            height: '40px',
            color: `${modal_color}.main`
          }}
        >
          <SvgIcon>
            <AlertOctagon />
          </SvgIcon>
        </Box>
        <div>
          <Typography variant='h5'>{warning_title}</Typography>
          <Typography sx={{ mt: 2 }} variant='body1'>
            {warning_text}
          </Typography>
        </div>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pb: 3,
          px: 3
        }}
      >
        <Button color='inherit' sx={{ mr: 2 }} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: `${modal_color}.main`,
            '&:hover': {
              backgroundColor: `${modal_color}.dark`
            }
          }}
          variant='contained'
          onClick={onConfirm}
        >
          {button_text}
        </Button>
      </Box>
    </Paper>
  </Dialog>
)
