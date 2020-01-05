import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from './components/pages/Login';
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import Pet from "./components/pages/Pet";
import Profile from "./components/pages/Profile";
import RegisterPet from "./components/pages/RegisterPet";
import SignUp from "./components/pages/SignUp";
import "./App.css";

import { Layout, Menu, Button } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout className="layout" style={{height: '100%'}}>
          <Header>
            <NavBar />
          </Header>
          <Content style={{ padding: '0 50px'}}>
            <div style={{ background: '#fff', minHeight: 280, height: '100%', position: 'relative', 
              backgroundSize: '100%',backgroundColor: 'rgb(190, 224, 233)'}}>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/home" render={(props) => 
                  <div>
                    <Home {...props}/>
                  </div>
                }/>
                <Route path="/pet/:id" render={(props) => 
                  <div>
                    <Pet  {...props}/>
                  </div>
                }/>
                <Route path="/profile" render={(props) => 
                  <div>
                    <Profile/>
                  </div>
                }/>
                <Route path="/registerpet" render={(props) => 
                  <div>
                    <RegisterPet/>
                  </div>
                }/>
                <Route path="/signup" render={(props) => 
                  <div>
                    <SignUp/>
                  </div>
                }/>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Adopt A Pet ©2020 Created by Ayberk Aksoy
            <br/>
            <i style={{fontSize: '5'}}>
              -- This is a non-profit application for the sake of our animal friends --
            </i>
            
          </Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
