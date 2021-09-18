import { Box,   Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
 } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import axiosCovid from '../config/axiosCovid';
import Loading from '../components/Loading';

function Tweet() {

    const [list, setList] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {

        let mounted = true;
        async function getList() {
            let response = await axiosCovid("/tweets")
            setList(response.data.tweets);
            setMessage(response.data.message)
        }
        getList();
        return () => {
            mounted = false;
        }
    }, [])


    return (
        <Flex className="analysisMain" w="100%" flexDir="column"
        style={{ overflow: 'scroll', overflowX: 'hidden', overflowY: 'visible'}}>
          <Flex className="analysisHeading" flexDir="row" w="100%">
            <Heading color="#000">Trending Tweets</Heading>
          </Flex>
        <br/>
          {/* Check to see if any items are found*/}
          {list.length ? (

            <Table  variant="simple" colorScheme="facebook">
              <Thead>
                <Tr>
                  <Th>{message}</Th>
                </Tr>
              </Thead>
              <Tbody>
              {/* Render the list of items */}
              {list.map((item, index) => {
                return(
                    <Tr key={index}>
                      <Td>{item}</Td>
                    </Tr>
                );
              })}
              </Tbody>
            </Table>
          ) : (
            <Flex flex={1} justifyContent="center" alignItems="center">
              <Loading/>
            </Flex>
          )
        }
        </Flex>
    )
}

export default Tweet;