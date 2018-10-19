import React from "react";
import CSSModules from "react-css-modules";
import {
  Route,
  BrowserRouter,
  Switch,
  HashRouter,
  Link
} from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { router } from "./routers";
import style from "./App.less";
const { Header, Content, Footer, Sider } = Layout;

@CSSModules(style)
export default class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter basename="#">
        <Layout>
          <Sider style={{ minHeight: "100vh" }} collapsible>
            <Menu theme="dark" mode="inline">
              <Menu.Item>
                <Link to="/page1">
                  <Icon type="user" />
                  <span>page1</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/count">
                  <Icon type="user" />
                  <span>count</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/zzzd">
                  <Icon type="user" />
                  <span>404</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }} />
            <Content style={{ margin: "0 16px", padding: 24 }}>
              <Switch>
                {router.map((r, index) => (
                  <Route key={index} path={r.path} component={r.main} exact />
                ))}
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Parrot ©2018 Created by dwd fe
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
