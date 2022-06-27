import Radio from '@mui/material/Radio';
import { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Paper, RadioGroup, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { string, object, date, ref } from "yup";
import FormikTextField from "../../components/FormikTextField";
import api from '../../api'


export default function RegistrationForm(){
    
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting }) =>{
    setSubmitting(true)
    const { role, email, password } = values

    await api.post(`/users/signup`, { role, email, password })
    const {data} = await api.post(`/users/signin`, {email, password })

    sessionStorage.token = data.token
    sessionStorage.email = data.email
    sessionStorage.role = data.role
    api.setup(data.token)

    if (data.role === "performer") {
      navigate('/killerSide', { replace: true })
    } else {
      navigate('/puppeteerSide', { replace: true })
    }

    setSubmitting(false)
  }

  const formik = useFormik({
    initialValues: {
      role: '',
      birthday: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: handleSubmit,
    validationSchema: object().shape({
      role: string().required(),
      birthday: date().max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required(),
      email: string().email().required(),
      password: string().min(6).required(),
      repeatPassword: string().required().oneOf([ref('password')], 'Your passwords do not match.')
    }),
    validateOnMount: true,
  })


  const [value, setValue] = useState(null)

    return(
      <Paper
        sx={{ display: "flex", flexDirection:"column", alignItems: "center", width: { lg: "50%", xs: "70%"} , backgroundColor:'secondary.main'}}
        component="form"
        elevation={6}
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h4" textAlign="center" color='primary.main' my={3}>
          sign up
        </Typography>
        <FormControl sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '70%'}}>
          <FormLabel color="info" sx={{mr: '10%'}}>Sign up as a:</FormLabel>
          <RadioGroup
            row
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && !!formik.errors.role}
            helperText={
              formik.touched.role && !!formik.errors.role && formik.errors.role
            }
          >
            <FormControlLabel value="performer" control={<Radio />} label="Killer" mr={10}/>
            <FormControlLabel value="user" control={<Radio />} label="User" />
          </RadioGroup>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={value}
            onChange= {(newValue) => {
              setValue(newValue)
              formik.setFieldValue('birthday', newValue);
            }}
            renderInput={(params) => 
              <FormikTextField 
                {...params} 
                label="Birthday date"
                type="birthday"
                name="birthday"
                formik={formik}
                sx={{my: 2, width: '70%'}}
              />
            }
          />
        </LocalizationProvider>

        <FormikTextField
          label="Email Address"
          type="email"
          name="email"
          formik={formik}
          sx={{my: 2, width: '70%'}}
        />
        <FormikTextField
          label="Password"
          name="password"
          type='password'
          formik={formik}
          sx={{my: 2, width: '70%'}}
        />
        <FormikTextField
          label="Repeat Password"
          name="repeatPassword"
          type='password'
          formik={formik}
          sx={{my: 2, width: '70%'}}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!formik.isValid && !formik.isSubmitting}
          sx={{mb: 5, width: '70%'}}
        >
          sign in
        </Button>
      </Paper>
    )
}