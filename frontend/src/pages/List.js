import React, { Component } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import './List.css';
import NewCards from '../components/News.js';
import { Grid, Spacer } from "@chakra-ui/react";

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }


  // Retrieves the list of items from the Express app
  getList = () => {

    fetch('https://3gutozphyd.execute-api.us-east-2.amazonaws.com/Prod/api/list', {mode: 'cors'})
    .then(res => res.json())
    .then(list => this.setState({ isLoaded: true, list }))
  }

  render() {
    const { list } = this.state;
    console.log({list});

    return (
      <div className="App"
      style={{ overflow: 'scroll', overflowX: 'hidden', overflowY: 'visible'}}>
        <h1 class="header"> 📰 Latest News</h1>
        <br/>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <Grid templateColumns="repeat(3, 1fr)">
          {list.map((item) => {
            return(

              <NewCards date={item.date} title={item.title} link={item.link} author={item.author} />

            );
          })}
          </Grid>
          // <Table  variant="simple" colorScheme="facebook">
          //   <Thead>
          //     <Tr>
          //       <Th>Date</Th>
          //       <Th>Headline</Th>
          //       <Th>Author</Th>
          //     </Tr>
          //   </Thead>
          //   <Tbody>
          //   {/* Render the list of items */}
          //   {list.map((item) => {
          //     return(

          //         <Tr>
          //           <Td>{item.date}</Td>
          //           <Td><a href={item.link}>{item.title}</a></Td>
          //           <Td>{item.author}</Td>
          //         </Tr>
          //     );
          //   })}
          //   </Tbody>
          // </Table>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default List;