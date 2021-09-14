import React from 'react';
import { Box, Stack, Text } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

// Sample card from Airbnb

export default function NewCards ({title, date, author, link}){
    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image h="200px"  w="300px" src="https://media.istockphoto.com/vectors/flat-isometric-breaking-news-newspaper-vector-icon-on-colorful-pink-vector-id1180404624?k=6&m=1180404624&s=170667a&w=0&h=CbcJY8AeCJM9mZJ3B1GuVHLtuuCwwatYZc6oU9V3dzM="/>
    
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Latest New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                  {date}
              </Box>
            </Box>
    
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
               <a href={link}>{title}</a>
            </Box>
            <Box d="flex" mt="2" alignItems="center">
              {date}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {author}
              </Box>
            </Box>
          </Box>
        </Box>
      )
}
