import { Box,Flex,Button, Heading, Stack,FormControl,FormLabel,Input } from "@chakra-ui/react";
import axios from "axios";
import React,{useState} from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { backendHost } from "../../../lib/host";
import moment from 'moment'
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
    const initialValues = {
        title:'',
        price:0
      }
      const [values,setValues] = useState(initialValues)
      const [date, setDate] = useState(new Date());
      const handleChange = (e)=>{
        const {name,value} = e.target;
        setValues({...values,[name]:value})
      }
      const navigate = useNavigate()
      const handleSubmit = ()=>{
          const sendingObj = {
            title:values.title,
            ticket_price: values.price,
            start_date:moment(date).format('YYYY-MM-DD')//django date field 2022-07-30
          }
          
          axios.post(`${backendHost}/event/create/`,sendingObj)
          .then(res=>{
              console.log(res)
              navigate('/')
          })
          .catch(err=>{
              console.log(err)
          })
      }
      let newDate = new Date()
      newDate = newDate.getDate() + 1
  return (
    <>
      <Flex direction='column' my={4}>
        <Heading>Create Event</Heading>
        <Stack p={4} spacing={4}>
            <Box w={'80%'} shadow='md'>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={values.title}
              name="title"
              placeholder='Enter a title for your event'
              onChange={handleChange}
              />
          </FormControl>
            </Box>
            <Box w={'80%'} shadow='md'>
          <FormControl id="title" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              placeholder="Type Price in numbers"
              value={values.price}
              name="price"
              onChange={handleChange}
              />
          </FormControl>
            </Box>
            <Box>
              <FormLabel>Start Date</FormLabel>
            <Box shadow={'md'} w={{base:'80%',md:'20vw'}}>
          <DatePicker minDate={new Date()} selected={date} onChange={date=>{setDate(date)}} />
            </Box>
            </Box>
          <Box>
          <Button variant={'solid'} color='blue' onClick={handleSubmit}>Submit</Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
