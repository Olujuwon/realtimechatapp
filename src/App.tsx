import React, {useEffect, useState} from 'react';
import './App.css';
import {HelmetProvider, Helmet} from "react-helmet-async";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {fetchSignedInUser, registerNewTestUsers, selectUser} from "./redux/userSlice";
import {useCreateTestContactsMutation} from "./redux/appQueryV1";
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {addTestMessagesToFirebase} from "./redux/messageSlice";
import {Avatar, Layout, Menu, MenuProps} from "antd";
import Sider from "antd/es/layout/Sider";
import {Footer,Content, Header} from "antd/lib/layout/layout";
import {
    AntDesignOutlined,
    AppstoreOutlined,
    BarChartOutlined, CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";

const menuLinks = ["Sign in", "Sign up", "Messaging", "To do"]

const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => {
    let label = !menuLinks[index] ? `nav ${index + 1}` : `${menuLinks[index]}`
    return ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: label,
    })
});
/*
* TODO
*  fetch user here and use to route
* */
function App() {
    const content = useRoutes(routes);
    const dispatch = useAppDispatch();
    const [signedinUser, setSignedinUser] = useState(useAppSelector(selectUser));
    const [createTestContacts] = useCreateTestContactsMutation();

    useEffect(() => {
        //createTestData();
        if (Object.keys(signedinUser).length === 0) {
            dispatch(fetchSignedInUser());
        }
    }, [signedinUser])

    const createTestData = () => {
        //dispatch(registerNewTestUsers());
        // @ts-ignore
        //createTestContacts();
        //dispatch(addTestMessagesToFirebase());
    }

    return (
        <HelmetProvider>
            <Helmet
                titleTemplate="%s | Messaging App"
                defaultTitle="Messaging App"
            />

            <Layout hasSider={true} style={{height: "100vh"}}>
                <Sider style={{
                    overflow: 'auto',
                    height: '100vh',
                    width: "300px",
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    background: "#344E41",
                    textAlign: "center"
                }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" size={60} style={{
                        marginTop:"5%",
                        marginBottom:"25%",
                    }}/>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['0']} items={items} style={{
                        background:"transparent",
                        color:"white",
                    }} />
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200}}>
                    <Header style={{ padding: 0, background: "#A3B18A" }}></Header>
                    <Content>{content}</Content>
                    <Footer style={{ textAlign: 'center' }}>footer</Footer>
                </Layout>
            </Layout>
        </HelmetProvider>
    );
}

export default App;
