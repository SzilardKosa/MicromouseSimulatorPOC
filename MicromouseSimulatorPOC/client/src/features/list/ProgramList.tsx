import React from 'react'
import Program from '../../models/ProgramModel'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ProgramListItem from './ProgramListItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    }
  })
)

type Props = { programs: Program[] }

const ProgramList: React.FC<Props> = ({ programs }) => {
  const classes = useStyles()

  const content = programs.map(program => <ProgramListItem key={program.id} program={program} />)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {content}
      </Grid>
    </div>
  )
}

export default ProgramList
