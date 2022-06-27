import { TextField } from '@mui/material'

export default function FormikTextField({sx, name, formik, ...otherProps }) {
  return (
    <TextField
      color="info"
      id={name}
      name={name}
      type={name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={
        formik.touched[name] && !!formik.errors[name] && formik.errors[name]
      }
      sx ={{...sx}}
      {...otherProps}
    />
  )
}
