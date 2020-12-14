import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { fontSizes, themes } from './EditorIDE'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  })
)

const EditorSettings = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" size="large">
        <SettingsIcon />
      </Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl margin="normal" className={classes.formControl}>
              <InputLabel id="theme-label">Theme</InputLabel>
              <Select
                labelId="theme-label"
                id="theme"
                value={themes[0]}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => console.log(event)}
              >
                {themes.map(theme => (
                  <MenuItem value={theme} key={theme}>
                    {theme}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" className={classes.formControl}>
              <InputLabel id="font-label">Font Size</InputLabel>
              <Select
                labelId="font-label"
                id="font"
                value={fontSizes[0]}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => console.log(event)}
              >
                {fontSizes.map(size => (
                  <MenuItem value={size} key={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditorSettings
