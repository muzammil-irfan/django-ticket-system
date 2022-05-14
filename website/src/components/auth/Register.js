import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link,  useNavigate } from "react-router-dom";
import axios from "axios";
import { backendHost } from "../../lib/host";


export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    name:'',
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    console.log(values);
    axios.post(`${backendHost}/auth/register`,values)
    .then(res=>{
      console.log(res)
      navigate('/login')
    })
    .catch(err=>{
      console.log(err)
    })
  };
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" name='name' value={values.name} onChange={handleChange}  />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={values.email} name='email' onChange={handleChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} value={values.password} name='password' onChange={handleChange} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Flex justify={"center"} gap='1'>
                Already a user? <Link to='/login'><Text color='brand.400'>Login</Text></Link>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
