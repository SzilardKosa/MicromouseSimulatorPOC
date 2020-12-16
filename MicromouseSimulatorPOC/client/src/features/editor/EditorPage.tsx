import React from 'react'
import { Container, createStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid/Grid'
import TextField from '@material-ui/core/TextField/TextField'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Button from '@material-ui/core/Button/Button'
import EditorIDE from './EditorIDE'
import EditorSettings from './EditorSettings'
import SaveIcon from '@material-ui/icons/Save'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resize: {
      fontSize: theme.typography.h5.fontSize,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.h4.fontSize
      }
    },
    save: {
      marginLeft: theme.spacing(3)
    }
  })
)

const EditorPage = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* row 1*/}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <TextField
                value="Hello world in Python"
                margin="normal"
                InputProps={{
                  classes: {
                    input: classes.resize
                  }
                }}
                id="name"
                name="name"
                type="text"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              container
              direction="row"
              justify="space-between"
              alignItems="flex-end"
            >
              <div>
                <Button variant="contained" color="secondary" size="large">
                  <PlayArrowIcon />
                </Button>
                <Button variant="contained" color="primary" size="large" className={classes.save}>
                  <SaveIcon />
                </Button>
              </div>
              <EditorSettings />
            </Grid>
          </Grid>
        </Grid>
        {/* row 2*/}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <EditorIDE />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="outlined-multiline-static"
                label="Output"
                multiline
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default EditorPage
