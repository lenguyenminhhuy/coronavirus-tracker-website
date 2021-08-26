import React from 'react';
import { FormControl, FormLabel, Select, FormErrorMessage, FormHelperText,} from "@chakra-ui/react"
export default function FilterMap (category){
    
    return(
        <FormControl id="country">
        <FormLabel> Change categories data </FormLabel>
        <Select placeholder="Select option">
            <option> {category} </option>
        </Select>
        </FormControl>
    )

}