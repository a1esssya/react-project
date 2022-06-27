import { Button, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { string, object } from "yup";
import api from "../../api";
import FormikTextField from "../../components/FormikTextField";

export default function LoginForm(){

  const navigate = useNavigate()
    
  const handleSubmit = async (values, { setSubmitting }) =>{
    const { email, password } = values

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
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema: object().shape({
      email: string().email().required(),
      password: string().min(6).required(),
    }),
    validateOnMount: true,
  })


    return(
      <Paper
        sx={{ display: "flex", flexDirection:"column", alignItems: "center", width: { lg: "50%", xs: "70%"}, backgroundColor:'secondary.main'}}
        component="form"
        elevation={6}
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h4" textAlign="center" color='primary.main' my={3}>
          sign in
        </Typography>
        <FormikTextField
          label="Email Address"
          type="email"
          name="email"
          formik={formik}
          sx={{my: 2, width: '70%'}}
          // autoComplete="off"
        />
        <FormikTextField
          label="Password"
          name="password"
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