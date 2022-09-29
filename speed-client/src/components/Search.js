import React, { useState } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const [practice, setPractice] = useState('');

    const navigate = useNavigate();

    const handleSelect = (eventKey) => {
        setPractice(eventKey);
    }

    const navigateClaim = (claim) => {
        navigate('/search/'+claim, {
            state: {
                practice: practice,
                claim: claim
            }
        });
    }

    return (
        <>
        <div className='text-center m-3'>
            <h1>SPEED</h1>
            <p>Software Practice Empirical Evidence Database</p>
        </div>
        <div className='d-flex flex-column gap-3 justify-content-center align-items-center'
        style={{height: '50vh', width: '100vw'}}>
            <DropdownButton
            variant={practice ? 'outline-secondary' :'outline-primary'}
            title="Select a software engineering practice"
            onSelect={handleSelect}
            >
                <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
            </DropdownButton>
            { practice &&
            <DropdownButton
            variant='outline-primary'
            title={`Select a claim for ${practice}`}
            onSelect={navigateClaim}
            >
                <Dropdown.Item eventKey="claim-1">claim-1</Dropdown.Item>
                <Dropdown.Item eventKey="claim-2">claim-2</Dropdown.Item>
                <Dropdown.Item eventKey="claim-3">claim 3</Dropdown.Item>
            </DropdownButton>
            }

        </div>
        </>

    )
}
