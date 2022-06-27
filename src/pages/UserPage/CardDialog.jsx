import {useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, Radio, RadioGroup, Stack, Typography} from "@mui/material"
import {PhotoCamera as PhotoCameraIcon, Check as CheckIcon}  from '@mui/icons-material'
import FormikTextField from "../../components/FormikTextField"


export default function CardDialog({formik, setImage, title, onClose, ...otherProps }) {

  const [success, setSuccess] = useState(false)

  const handleButtonClick = () => {
    setSuccess(false)
  };
  
  return (
    <Dialog fullWidth="50%" {...{ onClose, ...otherProps }}>
      <DialogActions sx={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}} onSubmit={formik?.handleSubmit}>

        <DialogTitle>{title}</DialogTitle>

        <FormikTextField
          label="Last and first name of the person "
          type="name"
          name="name"
          formik={formik}
          sx={{my: 2, width: '80%'}}
          autoComplete="off"
        />

        <FormControl sx={{display: "flex", flexDirection: "column", alignItems: "start", width: '80%'}}>
          <FormLabel color="info">Sex:</FormLabel>
          <RadioGroup
            row
            name="sex"
            color="info"
            value={formik?.values?.sex}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={formik?.touched?.sex && !!formik?.errors?.sex}
            helpertext={formik?.touched?.sex && !!formik?.errors?.sex && formik?.errors?.sex}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" mr={10}/>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>

        <FormikTextField 
          label="Birthday date (mm/dd/yyyy)"
          type="birthDate"
          format="date"
          name="birthDate"
          formik={formik}
          sx={{my: 2, width: '80%'}}
        />


        <FormikTextField
          label="Distinctive features "
          type="description"
          name="description"
          formik={formik}
          sx={{my: 2, width: '80%'}}
          autoComplete="off"
        />

        <Stack direction="row" alignItems="center" justifyContent="center" my={2}>
          <Typography mr={3}>Upload photo</Typography>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" name="image" onClick={handleButtonClick} onChange={e => {
              setImage(e.target.files[0])
              setSuccess(true)
            }} sx={{display: "none"}}/>
            <IconButton color="primary" aria-label="upload picture" component="span">
              {success ? <CheckIcon /> : <PhotoCameraIcon />}
            </IconButton>
          </label>
        </Stack>

        <FormikTextField
          label="What price would you pay? "
          type="price"
          name="price"
          formik={formik}
          sx={{my: 2, width: '80%'}}
          autoComplete="off"
          InputProps={{
          endAdornment: (
            <InputAdornment position="start">$</InputAdornment>
          )
        }}
        />

        <Box sx={{display: "flex", justifyContent: "space-between", width: "80%", mt: 2, mb: 1}}>
          <Button variant="outlined" sx={{width: "45%"}} onClick={onClose}>Cancel</Button>
          <Button 
          sx={{width: "45%"}}
          type="submit"
          onClick={formik?.handleSubmit}
          variant="contained"
          disabled={!formik?.isValid && !formik?.isSubmitting}
          >
            Confirm
          </Button>
        </Box>

      </DialogActions>
    </Dialog>
  )
}
  