import React from "react";
import CSSModules from "react-css-modules";
import {
  Route, BrowserRouter, Switch, Link,
} from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { logout } from "./apis/index";

import { router } from "./routers";
import style from "./App.less";

const {
  Header, Content, Footer, Sider,
} = Layout;

@CSSModules(style)
export default class App extends React.PureComponent {
  async componentDidMount() {
    // code split
  }

  logsout = async () => {
    const { url } = await logout();
    window.location.href = url;
  };

  render() {
    return (
      <BrowserRouter basename="#">
        <Layout>
          <Sider style={{ minHeight: "100vh", background: "#fff" }}>
            <Menu mode="inline">
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
            <Header style={{ background: "#fff", padding: "0 20", textAlign: "right" }}>
              {window.__data && window.__data.staff}
              &nbsp;
              <Icon type="user" theme="outlined" />
              <a style={{ color: "#fe751a", marginLeft: 40 }} onClick={this.logsout}>
                注销
              </a>
            </Header>
            <Content style={{ margin: "0 16px", padding: 24 }}>
              <span styleName="test">1212</span>
              <Switch>
                {router.map((r, index) => (
                  <Route key={index} path={r.path} component={r.main} exact />
                ))}
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>Parrot ©2018 Created by dwd fe</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
