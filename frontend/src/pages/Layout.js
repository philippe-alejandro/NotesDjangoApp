import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'

const Layout = () => {
  return (
    <div className="container dark">
      <div className="app">
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout