import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, ListGroup, Overlay, Popover, Row } from 'react-bootstrap';

export default function Search() {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const [target, setTarget] = useState(null);
    const [data, setData] = useState([]);
    const [capitalName, setCapitalName] = useState('');

    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    useEffect(() => {
        let allData = localStorage.getItem("Countries")
        setData(JSON.parse(allData))
    }, [])

    return (
        <Row className='my-5' >
            <Col lg={{ span: 4, offset: 2 }}>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search Country's capital"
                        className="me-2" value={value} onChange={e => setValue(e.target.value)} onClick={handleClick}
                    />
                    <div ref={ref}>
                        <Overlay
                            show={show}
                            target={target}
                            placement="bottom"
                            container={ref}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained" className='w-100'>
                                <Popover.Body>
                                    <ListGroup className='border-0'>
                                        {data.filter(item => {
                                            const search = value.toLowerCase();
                                            const countryName = item.name.toLowerCase()
                                            return search && countryName.startsWith(search) && countryName !== search
                                        }).slice(0, 10).map(element => <ListGroup.Item className='border-0' onClick={e => { setValue(element.name); setShow(false); setCapitalName(element.capital) }}>{element.name}</ListGroup.Item>)}
                                    </ListGroup>
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                </Form>
                {capitalName && <h4 className='mt-3 fw-semibold'>Capital : {capitalName}</h4>}
            </Col>
        </Row >
    )
}
