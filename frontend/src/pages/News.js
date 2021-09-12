import React, { Component } from 'react';
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";
import Loading from "../components/Loading";
import './List.css';
import NewCards from '../components/News.js';
import { Grid, Spacer } from "@chakra-ui/react";

class News extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      list: [],
      renderList: []
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

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log(bottom);
  }

  render() {
    const { list } = this.state;
    console.log({list});

    return (
      <div className="App"
      onScroll={this.handleScroll.bind(this)}
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
          <Flex flex={1} justifyContent="center" alignItems="center">
            <Loading/>
          </Flex>
        )
      }
      </div>
    );
  }
}

export default News;