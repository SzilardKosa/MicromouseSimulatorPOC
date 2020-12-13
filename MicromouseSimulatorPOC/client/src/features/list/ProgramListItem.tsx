import React from 'react'
import Program from '../../models/ProgramModel'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CodeIcon from '@material-ui/icons/Code'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightIcon: {
      marginLeft: 'auto'
    }
  })
)

type Props = { program: Program }

const ProgramListItem: React.FC<Props> = ({ program }) => {
  const classes = useStyles()

  return (
    <Grid item xs={6} sm={4} md={3} key={program.id}>
      <Card>
        <CardContent>
          <Typography gutterBottom>{program.name}</Typography>
          <Chip label={program.language} color="secondary" />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="open in editor">
            <CodeIcon />
          </IconButton>
          <IconButton aria-label="delete" className={classes.rightIcon}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProgramListItem
