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
import './Nav.css';

const Sidebar = () => {
  return (
    <div
      style={{ display: 'flex', height: '100vh'}}
    >
      <CDBSidebar textColor="" backgroundColor="#fff" style={{boxShadow: '0px 4px 42px rgba(0,0,0,0.07)'}} >
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analysis" activeClassName="">
              <CDBSidebarMenuItem   icon="table">Analysis</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/news' activeClassName="">
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
    </div>
  );
};

export default Sidebar;
