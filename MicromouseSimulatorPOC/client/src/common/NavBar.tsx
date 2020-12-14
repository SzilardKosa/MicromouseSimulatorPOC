import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Container from '@material-ui/core/Container/Container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    }
  })
)

const NavBar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" className={classes.title}>
              <Link to="/list" className={classes.link}>
                Basic online compiler test
              </Link>
            </Typography>
            <Button color="inherit">
              <Link to="/list" className={classes.link}>
                List
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default NavBar
