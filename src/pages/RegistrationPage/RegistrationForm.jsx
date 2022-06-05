import Radio from '@mui/material/Radio';
import { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Paper, RadioGroup, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import { string, object, date, ref } from "yup";
import FormikTextField from "../../components/FormikTextField";






export default function RegistrationForm(){
    

  const handleSubmit = async (values, { setSubmitting }) =>{
    const { userType, birthday, email, password } = values
    alert(`
    UserType: ${userType},
    Birthday: ${new Date(birthday).getTime()},
    Email: ${email},
    Password: ${password},
    `)

    // const { data } = await api.post(`/targets`, { email, password })

    // sessionStorage.token = data.token
    // sessionStorage.email = data.email
    // api.setup(data.token)
    // navigate('/', { replace: true })
    setSubmitting(false)
  }

  const formik = useFormik({
    initialValues: {
      userType: '',
      birthday: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: handleSubmit,
    validationSchema: object().shape({
      userType: string().required(),
      birthday: date().max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required(),
      email: string().email().required(),
      password: string().min(6).required(),
      repeatPassword: string().required().oneOf([ref('password')], 'Your passwords do not match.')
    }),
    validateOnMount: true,
  })

  const [value, setValue] = useState(null)

  console.log(formik);

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
          <FormLabel sx={{mr: '10%'}}>Sign up as a:</FormLabel>
          <RadioGroup
            row
            name="userType"
            value={formik.values.userType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userType && !!formik.errors.userType}
            helperText={
              formik.touched.userType && !!formik.errors.userType && formik.errors.userType
            }
          >
            <FormControlLabel value="killer" control={<Radio />} label="Killer" mr={10}/>
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
                type="date"
                name="birthday"
                formik={formik}
                sx={{my: 2, width: '70%'}}
                autoComplete="off"
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
          autoComplete="off"
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