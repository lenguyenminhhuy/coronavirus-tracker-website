import React, {useState} from 'react';
import {
    Box,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Text,
    FormControl,
    Field,
    FormLabel,
}
from '@chakra-ui/react';
import PropTypes from 'prop-types';
import colors from '../../constants/colors'

function SubscribeModal ({isOpen, onClose}) {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    function subscribe(input) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000)
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
                </ModalBody>
                <ModalFooter>
                <FormControl>
                    <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" borderColor={colors.grayLight}/>
                    <Button type="submit" isLoading={loading} pr={10} pl={10} _hover={{backgroundColor: colors.redDarker}} borderColor={colors.redDark} backgroundColor={colors.redDark} color={colors.grayLighter} mr={3} onClick={() => subscribe(email)}>
                    Subscribe
                    </Button>
                </FormControl>

                </ModalFooter>
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