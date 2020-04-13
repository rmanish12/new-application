import React from 'react'

import { Jumbotron, Image } from 'react-bootstrap'

import book from '../../assets/books.jpg'
import book1 from '../../assets/books1.jpg'

const home = (props) => {
    return (
        <>
            <Jumbotron>
                <div style={{textAlign: 'center'}}><h2>Welcome to our book store</h2></div>
                <Image src={book} fluid/>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
            </Jumbotron>
        </>
    )
}

export default home