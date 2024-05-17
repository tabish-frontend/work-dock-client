import React, { forwardRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import DatePicker from 'react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

export const CreateEmployee = () => {
  const [language, setLanguage] = useState<string[]>([])
  const [date, setDate] = useState<Date | null | undefined>(null)

  // Handle Select
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create Employee' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    1. Account Details
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Username'
                    name='username'

                    // value={formik.values.username}
                    // onChange={formik.handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Name'
                    name='full_name'

                    // value={formik.values.full_name}
                    // onChange={formik.handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    name='email'
                    placeholder='johnDoe@example.com'

                    // onChange={formik.handleChange}
                    // value={formik.values.email}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Designation</InputLabel>
                    <Select
                      label='Designation'
                      multiple
                      name='designation'
                      onChange={handleSelectChange}
                      value={[]}

                      // value={formik.values.designation}
                    >
                      <MenuItem value='human resource'>Human Resource</MenuItem>
                      <MenuItem value='software engineer'>Software Engineer</MenuItem>
                      <MenuItem value='editor'>Editor</MenuItem>
                      <MenuItem value='maintainer'>Maintainer</MenuItem>
                      <MenuItem value='subscriber'>Subscriber</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Company'
                    placeholder='Please add your company name'
                    name='company'

                    // value={formik.values.company}
                    // onChange={formik.handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Account Status</InputLabel>
                    <Select
                      label='Account Status'
                      name='account_status'
                      value=''

                      // value={formik.values.account_status}
                      // onChange={formik.handleChange}
                    >
                      <MenuItem value='active'>Active</MenuItem>
                      <MenuItem value='pending'>Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 0 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    2. Personal Info
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='First Name' placeholder='Leonard' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Last Name' placeholder='Carter' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Country</InputLabel>
                    <Select
                      label='Country'
                      defaultValue=''
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                    >
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='USA'>USA</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Language</InputLabel>
                    <Select
                      multiple
                      value={language}
                      onChange={handleSelectChange}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='English'>English</MenuItem>
                      <MenuItem value='French'>French</MenuItem>
                      <MenuItem value='Spanish'>Spanish</MenuItem>
                      <MenuItem value='Portuguese'>Portuguese</MenuItem>
                      <MenuItem value='Italian'>Italian</MenuItem>
                      <MenuItem value='German'>German</MenuItem>
                      <MenuItem value='Arabic'>Arabic</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    selected={date}
                    showYearDropdown
                    showMonthDropdown
                    placeholderText='MM-DD-YYYY'
                    customInput={<CustomInput />}
                    id='form-layouts-separator-date'
                    onChange={(date: Date) => setDate(date)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Phone No.' placeholder='+1-123-456-8790' />
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Submit
              </Button>
              <Button size='large' color='secondary' variant='outlined'>
                Cancel
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}
