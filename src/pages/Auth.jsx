import React, { createContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SignIn from './SignIn'
import SignUp from './SignUp'

const getAllUsers = () => {
    let users = localStorage.getItem("Users")
    if (users) {
        return JSON.parse(localStorage.getItem("Users"))
    } else {
        return []
    }
}
export const AuthContext = createContext()
export default function Auth() {
    const [loginPage, setLoginPage] = useState(true)
    const [allUsers, setallUsers] = useState(getAllUsers())

    return (
        <Container>
            <Row className="mt-5">
                <Col lg={{ span: 4, offset: 4 }} sm={{ span: 10, offset: 1 }} xs={{ span: 12 }} className="mt-3">
                    <AuthContext.Provider value={{ setLoginPage, allUsers, setallUsers }}>
                        {loginPage
                            ? <SignIn />
                            : <SignUp />}
                    </AuthContext.Provider>
                </Col>
            </Row>
        </Container >
    )
}
