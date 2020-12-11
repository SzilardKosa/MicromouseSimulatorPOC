import React from 'react'
import './App.css'
import NavBar from './common/NavBar'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ListPage from './features/list/ListPage'
import EditorPage from './features/editor/EditorPage'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/list" component={ListPage} />
        <Route exact path="/editor/:id" component={EditorPage} />
        <Route path="/">
          <Redirect to="/list" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
