import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './Nav.css';
const Sidebar = () => {
  return (
    <div
      style={{ display: 'flex', height: '100%',}}
    >
      <CDBSidebar textColor="" backgroundColor="#fff" style={{boxShadow: '0px 4px 42px rgba(0,0,0,0.07)'}} >
          <div
            style={{
              padding: '30px 2px 50px 2px',
              marginLeft: "15px",
              marginRight: "15px",
              textAlign: 'left',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontWeight: '600',
              fontSize: '26px'
            }}
          >
        Coronavirus Tracker Website
          </div>
        <CDBSidebarContent className="sidebar-content" style={{fontSize: "15px"}}>
          <CDBSidebarMenu >
            <NavLink exact to="/" activeClassName="" >
              <CDBSidebarMenuItem icon="globe-asia"> Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <br></br>
            <NavLink exact to="/analysis" activeClassName="">
              <CDBSidebarMenuItem   icon="chart-line">Analysis</CDBSidebarMenuItem>
            </NavLink>
            <br></br>
            <NavLink exact to='/news' activeClassName="">
              <CDBSidebarMenuItem icon="list-alt">Latest News</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            @Team42-COSC2368
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
