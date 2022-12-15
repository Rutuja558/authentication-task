import { Formik } from 'formik'
import * as yup from 'yup'
import React, { useContext, useState } from 'react'
import { Button, Card, Form, FormControl, FormGroup } from 'react-bootstrap'
import { AuthContext } from './Auth'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
    const [error, setError] = useState(false)
    const { setLoginPage, allUsers } = useContext(AuthContext)
    const navigate = useNavigate()
    const schema = yup.object().shape({
        email: yup.string().required("Please Enter Your Email"),
        password: yup.string().required("Please Enter Your Password")
    });
    return (
        <Card>
            <Card.Body className="px-5 pt-3 border-0 rounded-0">
                <h3 className="text-center mb-4">Sign In</h3>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={schema}
                    onSubmit={loginDetails => {
                        let isUserExist = allUsers.find(user => user.email === loginDetails.email && user.password === loginDetails.password)

                        if (isUserExist) {
                            setTimeout(() => {
                                navigate('/home')
                            }, 1000);
                        } else {
                            setError(true)
                            setTimeout(() => {
                                setError(false)
                            }, 3000);
                        }
                    }}
                >{({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <FormControl className="form-control mt-2 py-2" placeholder="Email Id" type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.email && !!touched.email}></FormControl>
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <FormControl className="form-control mt-2 py-2" placeholder="password" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.password && !!touched.password}></FormControl>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </FormGroup>
                        {error && <p className='text-danger mt-2'>Invalid email or password</p>}
                        <Button type="submit" className="w-100 py-2 my-3" variant='dark' disabled={!errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword ? false : true} >Submit</Button>
                    </Form>
                )}
                </Formik>
                <p className='text-end'>Don't have an acount? <span className='text-primary fw-semibold' onClick={e => setLoginPage(false)}>Sign Up</span></p>
            </Card.Body>
        </Card>
    )
}
