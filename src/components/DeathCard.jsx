import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Menu, MenuItem, styled, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {ExpandMore as ExpandMoreIcon, MoreVert as MoreVertIcon, PublishedWithChanges as PublishedIcon, Handshake as HandshakeIcon, CheckCircleOutline as DoneIcon, HorizontalRule as LineIcon} from '@mui/icons-material';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import CardEditor from '../pages/UserPage/CardDialog';
import DeleteCard from '../pages/UserPage/DeleteCardAction';
import api from '../api';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DeathCard({data}) {
  const [expanded, setExpanded] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isCardEditorOpen, setIsCardEditorOpen] = useState(false)
  const edit = async () => {
    setIsCardEditorOpen(!isCardEditorOpen)
    handleCloseUserMenu() 
  }

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const deleteCard = () => {
    setIsDeleteOpen(!isDeleteOpen)
    handleCloseUserMenu()
  }

  const [image, setImage] = useState(null)
  const queryClient = useQueryClient()

  const handleSubmit = async (values,  { setSubmitting }) => {
    await api.put(`/targets/${data.id}`, { ...values})
    if(!!image){
    const resource = 'target'
    const formData = new FormData()
    formData.append('image', image)
    const { data: imageUrl } = await axios.post(
      'https://server.kemalkalandarov.lol/api/images',
      formData,
      { params: { resource, id: data.id } }, 
    )
    await api.put(`/targets/${data.id}`, { imageUrl })
    }
    queryClient.invalidateQueries('cards')
    setSubmitting(false)
    setIsCardEditorOpen(false)
  }

  const getUserdate = (milliseconds) => {
    const Userdate = new Date(milliseconds)
    const y = Userdate.getFullYear()
    let m = Userdate.getMonth() + 1;
    let d = Userdate.getDate();
    m = (m < 10) ? '0' + m : m;
    d = (d < 10) ? '0' + d : d;
    return [m, d, y].join('/');
  }

  const formik = useFormik({
    initialValues: {
      name: `${data?.name}`,
      sex: `${data?.sex}`,
      birthDate: `${getUserdate(data?.birthDate)}`,
      description: `${data?.description}`,
      price: `${data?.price}`,
      imageUrl: `${data?.imageUrl}`,
    },
    onSubmit: handleSubmit,
    validationSchema: object().shape({
      name: string().required('name is required'),
      sex: string().required('Choose the right variant'),
      birthDate: string().max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required("Plese, write the date in mm/dd/yyyy format"),
      description: string().max(400),
      price: number().min(5000).required('Price is required'),
      imageUrl: string(),
    }),
    validateOnMount: true,
})


  const [imagePreview, setImagePreview] = useState('')
  useEffect(() => {
    const reader = new FileReader()
    reader.onload = e => setImagePreview(e.target.result)

    if (image) {
      reader.readAsDataURL(image)
    }
    return () => {
      reader.onload = undefined
    }
  }, [image])


  return (
    <Card sx={{ width: "85%", backgroundColor: "secondary.light"}}>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "start"}}>
        <CardHeader
          title={data?.name}
        />
        <CardActions>
          <Tooltip title="Open settings">
            <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
              <MoreVertIcon color="info" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="123" onClick={edit}>
              <Typography textAlign="center">Edit</Typography>
            </MenuItem>
            <CardEditor
            open={isCardEditorOpen}
            onClose={() => setIsCardEditorOpen(false)}
            title="Add card"
            formik={formik}
            setImage={setImage}
            id = {data?.id}
          />
            <MenuItem key="456" onClick={deleteCard}>
              <Typography textAlign="center">Delete</Typography>
            </MenuItem>
            <DeleteCard 
              open={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              id = {data?.id}
            />
          </Menu>
        </CardActions>
      </Box>
      <CardMedia
        component="img"
        height="250"
        image={data?.imageUrl}
        alt="Person photo"
      />
      <CardActions disableSpacing sx={{display: "flex", my: 2}}>
      <Box sx={{ width: "50%", display: "flex", justifyContent: "space-between"}}>
        <Tooltip title="Published"><PublishedIcon color="success" fontSize='large'/></Tooltip>
          {(data?.status === "assigned" || data?.status === "confirmed") ? 
            <>
              <LineIcon color="success" fontSize='large'/>
              <Tooltip title="Assigned"><HandshakeIcon color="success" fontSize='large'/></Tooltip>
            </> : 
            <>
              <LineIcon color="disabled" fontSize='large'/>
              <Tooltip title="Assigned"><HandshakeIcon fontSize='large' color="disabled"/></Tooltip>
            </>
          }
          {data?.status === "confirmed" ? 
            <> 
              <LineIcon color="success" fontSize='large'/> 
              <Tooltip title="Done"><DoneIcon color="success" fontSize='large'/></Tooltip>
            </> : 
            <> 
              <LineIcon color="disabled" fontSize='large'/> 
              <Tooltip title="Done"><DoneIcon  fontSize='large' color="disabled"/></Tooltip>
            </>
          }
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon color="info"/>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Name: {data?.name}</Typography>
          <Typography paragraph>Sex: {data?.sex}</Typography>
          <Typography paragraph>Birthday: {getUserdate(data?.birthDate)}</Typography>
          <Typography paragraph>Distinctive features: {data?.description}</Typography>
          <Typography paragraph>Price: {data?.price}$</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}