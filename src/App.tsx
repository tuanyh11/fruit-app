import { useState, useEffect } from "react";
import axios from "axios";
import { FooterV2, Header, LayoutWithSideBar } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Detail,
  GridShop,
  Home,
  Cart,
  Checkout,
  MyAccount,
  LostPassword,
  About,
  Contact,
} from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop">
            <Route
              index
              element={
                <LayoutWithSideBar>
                  <GridShop />
                </LayoutWithSideBar>
              }
            />
            <Route
              path="/shop/grid-shop"
              element={
                <LayoutWithSideBar>
                  <GridShop />
                </LayoutWithSideBar>
              }
            />
            <Route
              path="/shop/list-shop"
              element={
                <LayoutWithSideBar>
                  <GridShop />
                </LayoutWithSideBar>
              }
            />
          </Route>
          <Route path="/product">
            <Route
              index
              element={
                <LayoutWithSideBar>
                  <Detail />
                </LayoutWithSideBar>
              }
            />
            <Route
              path=":id"
              element={
                <LayoutWithSideBar>
                  <Detail />
                </LayoutWithSideBar>
              }
            />
          </Route>
          <Route
            path="/cart"
            element={
              <LayoutWithSideBar>
                <Cart />
              </LayoutWithSideBar>
            }
          />
          <Route
            path="/checkout"
            element={
              <LayoutWithSideBar>
                <Checkout />
              </LayoutWithSideBar>
            }
          />

          <Route path="/account">
            <Route
              index
              element={
                <LayoutWithSideBar>
                  <MyAccount />
                </LayoutWithSideBar>
              }
            />

            <Route
              path="lost-password"
              element={
                <LayoutWithSideBar>
                  <LostPassword />
                </LayoutWithSideBar>
              }
            />
          </Route>

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
