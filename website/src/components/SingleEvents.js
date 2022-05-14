import {
  Heading,
  Icon,
  Stack,
  Flex,
  Image,
  SimpleGrid,
  AspectRatio,
  Box,
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  PopoverAnchor,
  Button,
  FormLabel,
  FormControl,
  Input,
  useDisclosure
} from "@chakra-ui/react";
import axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR,{useSWRConfig} from "swr";
import { backendHost } from "../lib/host";
import blackSeat from "../blackSeat.svg";
import blueSeat from "../blueSeat.svg";
import { useState,useEffect } from "react";
import {QRCodeSVG} from 'qrcode.react';
import { setDefaultLocale } from "react-datepicker";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function SingleEvents() {
  const params = useParams();
  const [data,setData] = useState(null)
  const userData = JSON.parse(sessionStorage.getItem('user'))
  // const { data, error,mutate } = useSWR(
  //   `${backendHost}/ticket/${params.eId}`,
  //   fetcher
  // );
  
  useEffect(()=>{
    const fetcher = ()=>{
      setData(null)
      axios.get(`${backendHost}/ticket/${params.eId}`)
      .then(res=>{
        console.log(res)
        if(res.data){
          res.data.ticket.map(item=>{
           return res.data.payment.map(pItem=>{
             if(item.tId === pItem.ticket.tId){
               console.log(item.tId,pItem.ticket.tId)
               item['payment'] = pItem
             }
            })
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
  console.log(data,userData);
  if (!data) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <Flex direction="column" >
        <Stack p={4} textAlign={"center"}>
          <Heading size="lg">Event: {data.title}</Heading>
        </Stack>
        <Stack align='center'>
        <SimpleGrid columns={3} maxW={{md:"40vw"}} w='full' >
          {data.ticket.map((item) => {
            const { seat_type } = item;
            return (
              <Seat
                userData={userData}
                item={item}
                key={item.tId}
                type={seat_type === "normal" ? "black" : "blue"}
              />
            );
          })}
        </SimpleGrid>
        </Stack>
      </Flex>
    </>
  );
}

const Seat = ({ type, item,mutate,userData }) => {
  return (
    <>
      <Flex justify="center" my={2} direction="column">
        <Image
          mx="auto"
          src={type === "black" ? blackSeat : blueSeat}
          maxW="120px"
          cursor={"pointer"}
        />
        <Flex justify="center" pos="relative" bottom="40%">
          {
            item.payment ?
            <Box>
              {
                
              item.payment.buyer.id === userData.id ?
              <QR_PopUp QR_Code={item.payment.QR_Code} />
              :
            <Button colorScheme={'red'}  m={1} disabled >
          Sold
        </Button> 
              }

            </Box>


            :
          <PopUp item={item} mutate={mutate} userData={userData} />
          }
        </Flex>
      </Flex>
    </>
  );
};
const QR_PopUp = ({QR_Code})=>{
  return(
    <>
    <Popover
    placement="bottom"
    closeOnBlur={true}
    >
      <PopoverTrigger>
      <Tag px={1} m={1} cursor="pointer">
          View
        </Tag>
      </PopoverTrigger>
      <PopoverContent>
      <PopoverCloseButton />
        <PopoverBody >
        <QRCodeSVG value={QR_Code} size={250} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
    </>
  )
}
const PopUp = ({ item,userData }) => {
  const initialValues = {
    name:userData.name,
    email:userData.email,
    payment:item.ticket_price
  }
  const [values,setValues] = React.useState(initialValues);
  const {onOpen,onClose,isOpen} = useDisclosure()
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setValues({...values,[name]:value})
  }
  const navigate=useNavigate()
  const handlePurchase = ()=>{
    console.log(item.tId)
    if(values.name === userData.name && values.email === userData.email){
      const obj = {
        buyer : userData.id,
        ticket: item.tId,
        payment_event:item.event.eId,
        QR_Code: values
      }
      axios.post(`${backendHost}/payment/create`,obj)
      .then(res=>{
        console.log(res)
        navigate('/')
        onClose()
      })
      .catch(err=>{
        console.log(err)
      })
    } else{
      alert('Please enter correct credentials')
    }
  }
  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Tag px={1} m={1} cursor="pointer">
          Buy
        </Tag>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Ticket Of Seat No.{item.seat_number} {item.seat_type === 'vip' && `(${item.seat_type})`}
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <InputForm label='Username:' placeholder='name'  name="name" onChange={handleChange} value={values.name}  />
          <InputForm label='Email:' placeholder='example@gmail.com' name="email" onChange={handleChange} value={values.email}  />
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Flex justify='space-between'>
            Price: 
            <Box w='70%' pl={2}>
            {item.ticket_price}
            </Box>
          </Flex>
            <Button size='sm' px={4} colorScheme="blue"  onClick={handlePurchase}>
              Buy
            </Button>
          {/* <ButtonGroup > */}
          {/* </ButtonGroup> */}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
const InputForm = ({label,name,value,onChange,placeholder})=>{
  return (
    <FormControl d='flex' justifyContent={'space-between'} py={1}>
            <FormLabel>{label}</FormLabel>
            <Input size='xs' placeholder={placeholder} w='70%' name={name} value={value} onChange={onChange} />
          </FormControl>
  )
}