import React, { useEffect, useState } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Search = () => {
    //Populate the practice list from the menu
    const [practiceList, setPracticeList] = useState([]);

    //retrieve list of practice from database
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DB_URL}/practices`)
        .then(res => {
            setPracticeList(res.data);
        }
        )
        .catch(err => console.log(err));
    },[])

    const [practice, setPractice] = useState('');
    const [practiceDisplay, setPracticeDisplay] = useState('');

    const navigate = useNavigate();

    //Set the selected practice
    const handleSelect = (eventKey, event) => {
        setPractice(eventKey);
        setPracticeDisplay(event.target.innerHTML);
    }

    //Set the claims for the selected practice
    const [claims, setClaims] = useState([]);

    useEffect(()=>{
        if(!practice) return
        axios.get(`${process.env.REACT_APP_DB_URL}/claims/${practice}`)
        .then(res => {
            setClaims(res.data);
        }
        )
        .catch(err => console.log(err));
    },[practice])


    //Navigate to the claim page
    const navigateClaim = (claim, event) => {
        
        navigate('/search/'+claim, {
            state: {
                practice: practice,
                claim: claim,
                claimTitle: event.target.innerHTML
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
            {!practice &&
            <DropdownButton
            variant={practice ? 'outline-secondary' :'outline-primary'}
            title="Select a software engineering practice"
            onSelect={handleSelect}
            >
                {practiceList.map((practice) => (
                    <Dropdown.Item eventKey={practice.id} key={practice.title}
                    name = {practice.title}
                    >{practice.title}</Dropdown.Item>
                ))}
            </DropdownButton>
            }

            { practice &&
            <>
            <DropdownButton
            title={`Select a claim for ${practiceDisplay}`}
            onSelect={navigateClaim}
            >
                {claims.map((claim) => (
                    <Dropdown.Item eventKey={claim.id} key={claim.id}
                    >{claim.claim}</Dropdown.Item>
                ))}
            </DropdownButton>
            <p>Or...</p>
            <Button 
            variant='outline-secondary'
            onClick={() => setPractice('')}>
                Select another practice
            </Button>
            </>
            }

        </div>
        </>

    )
}
