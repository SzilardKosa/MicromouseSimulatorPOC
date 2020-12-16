import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box, CircularProgress, Container, makeStyles } from '@material-ui/core'
import AddNewProgram from './AddNewProgram'
import ProgramList from './ProgramList'
import { fetchPrograms, selectAllPrograms } from './listSlice'
import { RootState } from '../../app/store'

const useStyles = makeStyles({
  box: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const ListPage = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const programs = useSelector(selectAllPrograms)

  const fetchStatus = useSelector((state: RootState) => state.list.status)
  const error = useSelector((state: RootState) => state.list.error)

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchPrograms())
    }
  }, [fetchStatus, dispatch])

  let content

  if (fetchStatus === 'loading') {
    content = (
      <Box className={classes.box}>
        <CircularProgress color="secondary" />
      </Box>
    )
  } else if (fetchStatus === 'succeeded') {
    content = (
      <React.Fragment>
        <ProgramList programs={programs} />
        <AddNewProgram />
      </React.Fragment>
    )
  } else if (fetchStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <Container maxWidth="lg">
      <React.Fragment>{content}</React.Fragment>
    </Container>
  )
}

export default ListPage
