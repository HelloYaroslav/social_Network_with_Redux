import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Profile from "./mainComponents/Profile/Profile";
import Musik from "./mainComponents/Musik/Musik";
import News from './mainComponents/News/News';
import Settings from './mainComponents/Settings/Settings';
import Dialog from "./mainComponents/Dilog/Dilog";
import Login from './LoginPage/LoginPage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/music' component={Musik}/>
                <Route exact path='/dialogs/:id?' component={Dialog}/>
                <Route exact path='/news' component={News}/>
                <Route exact path='/settings' component={Settings}/>
            </Switch>
        </BrowserRouter>
    );
};
export default App;

