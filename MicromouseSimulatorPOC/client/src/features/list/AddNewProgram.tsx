import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Languages } from '../../models/ProgramModel'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import { useForm } from 'react-hook-form'
import ReactHookFormSelect from '../../common/ReactHookFormSelect'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const AddNewProgram = () => {
  const [open, setOpen] = React.useState(false)
  const { register, handleSubmit, errors, control } = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
    console.log(errors)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new program</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate id="add-new-program-form">
            <TextField
              autoFocus
              error={errors.name && true}
              margin="normal"
              id="name"
              name="name"
              inputRef={register({ required: true })}
              label="Name of the program"
              type="text"
              fullWidth
              helperText={errors.name && 'Name is required'}
            />
            <ReactHookFormSelect
              id="language"
              name="language"
              label="Language"
              control={control}
              defaultValue={Languages.python}
              margin="normal"
            >
              <MenuItem value={Languages.python}>Python</MenuItem>
              <MenuItem value={Languages.c}>C</MenuItem>
              <MenuItem value={Languages.cpp}>C++</MenuItem>
            </ReactHookFormSelect>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" form="add-new-program-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddNewProgram
