import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/stores";
import { NavLink, Route } from 'react-router-dom';


export default function NavBar(){
    const {activityStore} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink}to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:10}}/>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Reactivities'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}