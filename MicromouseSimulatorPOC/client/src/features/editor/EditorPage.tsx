import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { fetchProgram, runProgram, selectProgram, updateName, updateProgram } from './editorSlice'
import { useParams } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'

import { Box, CircularProgress, Container, createStyles } from '@material-ui/core'
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
        fontSize: theme.typography.h4.fontSize,
      },
    },
    save: {
      marginLeft: theme.spacing(3),
    },
    box: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '2rem',
    },
    buttonProgress: {
      color: 'white',
    },
  })
)

const EditorPage = () => {
  const params = useParams<{ id: string }>()
  const classes = useStyles()

  const dispatch: AppDispatch = useDispatch()
  const program = useSelector(selectProgram)
  const fetchStatus = useSelector((state: RootState) => state.editor.loadingStatus)
  const error = useSelector((state: RootState) => state.editor.loadingError)
  const result = useSelector((state: RootState) => state.editor.result)
  const runStatus = useSelector((state: RootState) => state.editor.runStatus)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'pending'>('idle')

  useEffect(() => {
    if (fetchStatus !== 'loading') {
      dispatch(fetchProgram(params.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const handleRun = () => {
    if (program) {
      dispatch(runProgram(program.id!))
    }
  }

  const handleSave = async () => {
    if (program) {
      try {
        setSaveStatus('pending')
        const result = await dispatch(updateProgram(program))
        unwrapResult(result)
      } catch (err) {
        console.log(err)
      } finally {
        setSaveStatus('idle')
      }
    }
  }

  let content

  if (fetchStatus === 'loading') {
    content = (
      <Box className={classes.box}>
        <CircularProgress color="secondary" />
      </Box>
    )
  } else if (fetchStatus === 'succeeded') {
    content = (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* row 1*/}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={8}>
                <TextField
                  value={program?.name}
                  onChange={(event) => {
                    dispatch(updateName(event.target.value))
                  }}
                  margin="normal"
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
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
                  <Button variant="contained" color="secondary" size="large" onClick={handleRun}>
                    {runStatus == 'loading' ? (
                      <CircularProgress size={24} className={classes.buttonProgress} />
                    ) : (
                      <PlayArrowIcon />
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSave}
                    className={classes.save}
                  >
                    {saveStatus == 'pending' ? (
                      <CircularProgress size={24} className={classes.buttonProgress} />
                    ) : (
                      <SaveIcon />
                    )}
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
                <EditorIDE program={program!} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  InputLabelProps={{ disableAnimation: true }}
                  id="outlined-multiline-static"
                  label="Output"
                  value={result ? result.result : ''}
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
  } else if (fetchStatus === 'failed') {
    content = <div>{error}</div>
  }

  return <React.Fragment>{content}</React.Fragment>
}

export default EditorPage
