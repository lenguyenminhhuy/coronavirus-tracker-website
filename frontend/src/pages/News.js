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
import logger from '../config/logger';
import axiosCovid from '../config/axiosCovid';

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

    axiosCovid.get('/api/list', {mode: 'cors'})
    .then(res => res.data)
    .then(list => this.setState({ isLoaded: true, list }))
    .catch((err) => {
      logger(err);
    }) 
  }


  render() {
    const { list } = this.state;

    return (
      <Flex className="analysisMain" w="100%" flexDir="column"
      style={{ overflow: 'scroll', overflowX: 'hidden', overflowY: 'visible'}}>
        <Flex className="analysisHeading" flexDir="row" w="100%">
          <Heading color="#000">Latest News</Heading>
        </Flex>
      <br/>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <Grid templateColumns="repeat(3, 1fr)">
          {list.map((item) => {
            return(

              <NewCards key={item.link} date={item.date} title={item.title} link={item.link} author={item.author} />

            );
          })}
          </Grid>
        ) : (
          <Flex flex={1} justifyContent="center" alignItems="center">
            <Loading/>
          </Flex>
        )
      }
      </Flex>
    );
  }
}

export default News;