import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Profile from "./mainComponents/Profile/Profile";
import Music from "./mainComponents/Musik/Musik";
import News from './mainComponents/News/News';
import Settings from './mainComponents/Settings/Settings';
import Dialog from "./mainComponents/Dilog/Dilog";
import Login from './LoginPage/LoginPage';
import Users from "./mainComponents/Users/Users";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/music' component={Music}/>
                <Route exact path='/dialogs/:id?' component={Dialog}/>
                <Route exact path='/news' component={News}/>
                <Route exact path='/settings' component={Settings}/>
                <Route exact path='/users' component={Users}/>
            </Switch>
        </BrowserRouter>
    );
};
export default App;

