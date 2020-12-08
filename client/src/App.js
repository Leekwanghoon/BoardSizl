import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from "./components/views/LandingPage/LandingPage";
import Login from "./components/views/LoginPage/Login";
import Register from "./components/views/RegisterPage/Register";
import Auth from './hoc/auth';
import styled, { ThemeProvider } from "styled-components";
import Theme from "../src/Styles/Theme";
import GlobalStyles from "../src/Styles/GlobalStyles";
import Footer from "./utils/Footer";
import Header from "./utils/Header";
import UploadPage from "./components/views/UploadPage/UploadPage";
import BoardDetailPage from "./components/views/Board/BoardDetailPage";
import BoardUpdate from "./components/views/Board/BoardUpdate";
import BoardEdit from "./components/views/Board/BoardEdit";
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <>
      <GlobalStyles />
      <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(Login,false)} />
            <Route exact path="/register" component={Auth(Register,false)} />
            <Route exact path="/board/upload" component={Auth(UploadPage,true)} />
            <Route exact path="/board/:boardId" component={Auth(BoardDetailPage, null)} />
            <Route exact path="/board/update/:userId" component={Auth(BoardUpdate, true)} />
            <Route exact path="/edit/Myboard/:boardId" component={Auth(BoardEdit, true)} />
          </Switch>
        <Footer />
      </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
