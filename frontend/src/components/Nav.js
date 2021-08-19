import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import List from '../pages/List';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import './Nav.css';

const Sidebar = () => {
  return (
    <div
      style={{ display: 'flex', height: '100vh', fixed: true, position:'fixed' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#161b2d">
        <CDBSidebarHeader prefix={<i style={{marginLeft:5}} className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit', m: '10px 12px 10px 5px'}}
          >
            Covid Tracking
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/report" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Report</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/list' activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="newspaper">Latest News</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            @Corana-virus-Tracking
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/list' component={List}/>
        </Switch>
    </div>
  );
};

export default Sidebar;
