import React from 'react'
import {Flex,Text} from '@chakra-ui/react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


export default function Header() {
    
    const navigate = useNavigate()
    // console.log()
    useEffect(()=>{
        (()=>{
            let user = sessionStorage.getItem('user')
            user = JSON.parse(user)
            
        if(!user){
            navigate('/signup')
        }})();
    },[]);
    const paths = window.location.pathname
    const bool = paths.includes('/sign') || paths.includes('/login')
  return (
    <>
    <Flex justify={'space-between'} visibility={bool ? 'hidden':'visible'} px={6}py={4} shadow='lg'>
        <Text fontWeight={'black'}>
            Ticket Management System 
        </Text>
        <Flex justify="space-evenly"  w='40vw'>
        {
            links.map((item,index)=>{
                return(

            <Text key={index}>
                <Link  to={item.href}>
                {item.label}
                </Link>
            </Text>
                )
            })
        }
        </Flex>
    </Flex>
    </>
  )
}

const links = [
    {
        label:'Events',
        href:'/'
    },
    {
        label:'Payments',
        href:'/payments'
    },
    {
        label:'Account',
        href:'/account'
    },
]