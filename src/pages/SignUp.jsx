import { Formik } from 'formik'
import * as yup from 'yup'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth';

export default function SignUp() {
    const navigate = useNavigate()
    const { setLoginPage, allUsers, setallUsers } = useContext(AuthContext)
    const schema = yup.object().shape({
        firstName: yup.string().required("Please Enter Your First Name"),
        lastName: yup.string().required("Please Enter Your Last Name"),
        email: yup.string().required("Please Enter Your Email"),
        password: yup.string().required("Please Enter Your Password"),
        confirmPassword: yup.string().required().oneOf([yup.ref('password')], "Password Do not match"),
    });
    useEffect(() => {
        localStorage.setItem("Users", JSON.stringify(allUsers))
    }, [allUsers])

    return (
        <Card>
            <Card.Body className="px-5 pt-3 border-0 rounded-0">
                <h3 className="text-center mb-4">Create an Account</h3>

                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={schema}
                    onSubmit={values => {
                        setallUsers([...allUsers, values])
                        setTimeout(() => {
                            navigate("/home")
                        }, 1000);
                    }}
                >{({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched
                }) => (<Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormControl className="form-control py-2" placeholder="First Name" type="text" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.firstName && !!touched.firstName}></FormControl>
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <FormControl className="form-control mt-2 py-2" placeholder="Last Name" type="text" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.lastName && !!touched.lastName}></FormControl>
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <FormControl className="form-control mt-2 py-2" placeholder="Email" type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.email && !!touched.email}></FormControl>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <FormControl className="form-control mt-2 py-2" placeholder="password" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.password && !!touched.password}></FormControl>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <FormControl className="form-control mt-2 py-2" placeholder="Confirm Password" type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.confirmPassword && !!touched.confirmPassword}></FormControl>
                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    </FormGroup>
                    <Button type="submit" className="w-100 py-2 my-3" variant='dark' disabled={!errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword ? false : true} >Submit</Button>
                </Form>)}
                </Formik>
                <p className='text-end'>Already have an account ? <span className='text-primary fw-semibold' onClick={e => setLoginPage(true)}>sign in</span></p>
            </Card.Body>
        </Card>
    )
}
