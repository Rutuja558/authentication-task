import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button, Col, Row, Spinner, Table } from 'react-bootstrap';
import Search from './Search';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1)
    const [entriesPerPage, setentriesPerPage] = useState(25)
    const [loading, setLoading] = useState(false)
    const [countries, setCountries] = useState([])

    const getAllData = async () => {
        setLoading(true)
        const { data } = await axios.get("https://restcountries.com/v2/all")
        setLoading(false)
        setCountries(data)
        localStorage.setItem('Countries', JSON.stringify(data))
    }

    const navigate = useNavigate()

    useEffect(() => {
        getAllData()
    }, [])

    const indexOfLastPost = currentPage * entriesPerPage
    const indexOfFirstPost = indexOfLastPost - entriesPerPage
    const currententries = countries.slice(indexOfFirstPost, indexOfLastPost)
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(countries.length / entriesPerPage); i++) {
        pageNumbers.push(i)
    }
    const paginate = (pnum) => setCurrentPage(pnum)
    return (
        <>
            <Row>
                <Col lg={{ span: 12 }} className="text-end mt-3">
                    <Button variant='danger' onClick={e => setTimeout(navigate("/"), 1000)}>Logout</Button>
                </Col>
            </Row>
            <Search />
            <Row>
                <Col lg={{ span: 8, offset: 2 }}>
                    <Table striped className='border'>
                        <thead>
                            <tr>
                                <th scope="col">Sr. No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Capital</th>
                                <th scope="col">Currencies</th>
                            </tr>
                        </thead>
                        {loading && <Spinner variant='dark'
                            as="span"
                            animation="border"
                            size="lg"
                            role="status"
                            aria-hidden="true"
                        />}
                        <tbody>
                            {currententries.map((item, index) => <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td> {item.capital}</td>
                                <td> {item?.currencies && <p> {item.currencies[0].symbol} (code :  {item.currencies[0].code})</p>}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 8, offset: 2 }}>
                    {pageNumbers.map(number => <Button key={`button_${number}`} onClick={() => { paginate(number) }} className='my-5 ms-1 rounded-circle btn-light'>{number}</Button>)}
                </Col>
            </Row>

        </>
    )
}
