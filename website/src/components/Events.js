import {
  Box,
  Flex,
  Stack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Tag,
  useDisclosure,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import axios from 'axios'
import React, { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { backendHost } from "../lib/host";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const date = new Date();
  const currentDate = moment(date).format("YYYY-MM-DD");
export default function Events() {
  let user = sessionStorage.getItem("user");
  user = JSON.parse(user);
  const navigate = useNavigate();
  if(!user){navigate('/signup')}
  const admin = user && user.isAdmin ;
  const {isOpen,onOpen,onClose} = useDisclosure()
  const [deleteId,setDeleteId]= useState(0);
  // const { data, error,mutate } = useSWR(`${backendHost}/event/getAll`, fetcher);
  // console.log(admin);
  const [data,setData] = useState(null)
  useEffect(()=>{
    const fetcher = ()=>{
      setData(null)
      axios.get(`${backendHost}/event/getAll`)
      .then(res=>{
        // console.log(res)
        if(res.data){
          res.data = res.data.filter(item=>{
          //  console.log(item)
          if(item.start_date > currentDate)
            return item
          })
        }
        setData(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    fetcher();
    
  },[])
  console.log(deleteId)
  const handleDelete = () => {
    onClose()
    axios.delete(`${backendHost}/event/delete/${deleteId}`)
    .then(res=>{
      setData(data=>data.filter(item=>item.eId !== deleteId))
    })
  };
  const deleteClick=(id)=>{
    console.log(id);
    setDeleteId(id);
    onOpen();
  }
  if(!data){return <p>Loading...</p>}
  return (
    <>
      <Flex direction="column">
        <DeleteModal isOpen={isOpen} onClose={onClose} handleDelete={handleDelete} />
        {/* Heading */}
        <Flex justify="space-between" p={4} my={4} bg="white">
          <Heading>Events</Heading>
          <Flex gap={1} align="center">
            {admin && (
              <Box>
                <Tag
                  size="lg"
                  variant={"solid"}
                  colorScheme="blue"
                  cursor="pointer"
                  onClick={() => navigate(`/admin/event/create`)}
                >
                  Create
                </Tag>
              </Box>
            )}
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiSearchAlt2 color="gray.300" />}
              />
              <Input type="tel" placeholder="Search" />
            </InputGroup>
          </Flex>
        </Flex>
        {/* Table */}
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Status</Th>
                <Th>Title</Th>
                <Th>Start Date</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody bg="white">
              {data && data.length > 0 ? (
                data.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.eId}</Td>
                    <Td>
                      <StatusObserver date={item.start_date} />
                    </Td>
                    <Td>{item.title}</Td>
                    <Td>{item.start_date}</Td>
                    <Td>
                      <Tag
                        size="md"
                        colorScheme="blue"
                        cursor="pointer"
                        onClick={() => navigate(`/events/${item.eId}`)}
                        variant="outline"
                      >
                        View
                      </Tag>
                      {admin && (
                        <Tag
                          size="md"
                          colorScheme="red"
                          variant={"solid"}
                          cursor="pointer"
                          onClick={()=>deleteClick(item.eId)}
                          ml={1}
                        >
                          Delete
                        </Tag>
                      )}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={4}>
                    <Text textAlign={"center"}>
                      There is not any events available
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}

const StatusObserver = (props) => {
  // const date = new Date();
  // const currentDate = moment(date).format("YYYY-MM-DD");

  return (
    <>
      <Tag
        size="md"
        colorScheme={props.date > currentDate ? "green" : "red"}
        cursor="pointer"
      >
        {props.date > currentDate ? "Active" : "Expired"}
      </Tag>
    </>
  );
};
const DeleteModal = ({onClose,isOpen,handleDelete})=>{
  return(
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <ButtonGroup>
            <Button colorScheme={'blue'} onClick={onClose}>Close</Button>
            <Button colorScheme={'red'} onClick={handleDelete}>Delete</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}