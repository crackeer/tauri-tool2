"use client";
import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import "@arco-design/web-react/dist/css/arco.css";
import { Layout, Menu } from "@arco-design/web-react";
import invoke from "@/util/invoke";
import cache from "@/util/cache";
const Sider = Layout.Sider;
const MenuItem = Menu.Item;

const pages = {
    "/json" : "JSON",
    "/web/qrcode" : "二维码",
    "/web/tool" : "Web工具",
    "/request" : "请求",
}

export default function RootLayout({ children }) {
    const [activeMenuKey, setActiveMenuKey] = useState([]);
    const clickMenuItem = (item) => {
        window.location.href = item;
        invoke.setWindowTitle(pages[item]);
    };
    useEffect(() => {
        setActiveMenuKey([window.location.pathname]);
        cache.writeFile("last-page", window.location.pathname)
    }, []);
    return (
        <html lang="en">
            <body>
                <Layout>
                    <Sider
                        theme="light"
                        collapsed={false}
                        width={"100px"}
                        style={{
                            overflow: "auto",
                            height: "100vh",
                            position: "fixed",
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <Menu
                            onClickMenuItem={clickMenuItem}
                            theme="light"
                            width="150"
                            selectedKeys={activeMenuKey}
                        >
                            {
                                Object.keys(pages).map((key) => {
                                    return (
                                        <MenuItem key={key}>{pages[key]}</MenuItem>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ marginLeft: "100px", padding: "8px" }}>
                        {children}
                    </Layout>
                </Layout>
            </body>
        </html>
    );
}
