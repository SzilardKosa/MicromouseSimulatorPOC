import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
import { deleteProgram } from './listSlice'

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
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteProgram(program.id!))
  }

  return (
    <Grid item xs={6} sm={4} md={3} key={program.id}>
      <Card>
        <CardContent>
          <Typography gutterBottom>{program.name}</Typography>
          <Chip label={program.language} color="secondary" />
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`/editor/${program.id}`}>
            <IconButton aria-label="open in editor">
              <CodeIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" className={classes.rightIcon} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProgramListItem
