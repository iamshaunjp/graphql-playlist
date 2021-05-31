import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const queryAllUser = gql`
    {
        queryAllUser
        {
            firstName,
            email
        }
    }
`;

const displayData = (data) =>
{
    if(data.loading)
    {
        return <div>loading data</div>
    }
    else{
        return( 
            <li>
                <li>{data.queryAllUser.firstName}</li>
                <li>{data.queryAllUser.email}</li>
            </li>
        )
    }
}
const BookList = (props)=> 
{       
    // var tt = displayData(props.data)

    console.log(props);
    return(
        <div>
            <ul id="book-list">
                {displayData(props.data)}
            </ul>
        </div>
    );
}

export default graphql(queryAllUser)(BookList);
