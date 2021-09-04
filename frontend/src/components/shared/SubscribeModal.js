import React, {useState} from 'react';
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Text,
    FormControl,
    FormErrorMessage,
}
from '@chakra-ui/react';
import PropTypes from 'prop-types';
import colors from '../../constants/colors'
import {Formik, Form, Field} from 'formik'
import axios from 'axios';
import axiosCovid from '../../config/axiosCovid';

function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
}

function SubscribeModal ({isOpen, onClose}) {

    const [loading, setLoading] = useState(false);

    function subscribe(email, actions) {
        setLoading(true);
        axiosCovid.post('/subscribe', {
            email: email
        })
        .then((res) => {
            setLoading(false);
            onClose();
        })
        .catch((err) => {
            actions.setFieldError('email', err);
        })
    }

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent  p={5}>
                <ModalHeader>Subscribe to our newsletter</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={14} fontWeight={300} color={colors.grayDefault}>
                        Signup for our weekly newsletter to get the latest Covid-19 news, updates and amazing offers delivered directly in your inbox
                    </Text>
                <Formik
                    initialValues={{email: ""}}
                    onSubmit={(values, actions) => subscribe(values.email, actions)}
                >
                    <Form>
                        <Field name="email" validate={validateEmail}>
                            {({field, form}) => {
                            console.log(form);
                            return (
                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <Input {...field} id="email" type="email" placeholder="Enter your email" borderColor={colors.grayLight}/>
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                            )}}
              
                        </Field>  
                        <Button
                            float="right" 
                            type="submit" 
                            isLoading={loading} 
                            pr={10} 
                            pl={10} 
                            _hover={{backgroundColor: colors.redDarker}} 
                            borderColor={colors.redDark} 
                            backgroundColor={colors.redDark} 
                            color={colors.grayLighter}>
                                Subscribe
                        </Button>  
                    </Form>
                </Formik>
                </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

SubscribeModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default SubscribeModal;