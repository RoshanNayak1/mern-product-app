import { Box, Container, Heading, VStack ,Button, Input, Alert } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { ToastContainer, toast } from 'react-toastify';


const CreatePage = () => {
  let [newProduct , setNewProduct] = useState({
        name:"",
        price:"",
        image:""
    });

    const {createProduct} = useProductStore();
    const notify = (type,message)=>{
        toast(message,{
            position:"bottom-center",
            autoClose:1500,
            closeOnClick:true,
            pauseOnHover:true,
            hideProgressBar:true,
            type:type==="success" ? "success" : "error"
        });
        
    };

    const handleAddProduct =async()=>{
        const {success , message} = await createProduct(newProduct)
        console.log("Success:" ,success)
        console.log("Message:" ,message)
        console.log(newProduct);
       
        
       if(success){
        notify("success", "Product Added Successfully");
        setNewProduct({
            name:"", price:"" , image:""
        });
       }
       else {
        notify("error" , "Please fill in all fields")
       }
    
    }

  return (
    <>
    <Container maxW={"container.sm"}> 
        <VStack spacing={8}>
            
            <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>Create New Product</Heading>
        <Box 
        w={'50%'} 
        bg={useColorModeValue("white" ,"grey.800")}
        p={6}
        rounded={"lg"}
        shadow={"md"}
        >
          <VStack spacing={4}>
          <Input 
          type="text" 
          placeholder='Product Name'
          name='name'
          value={newProduct.name}
          onChange={(e)=>setNewProduct(
            {...newProduct,[e.target.name]:e.target.value
            }
          )}
          
          />
          <Input 
          type="number" 
          min={0}
          placeholder='Product Price'
          name='price'
          value={newProduct.price}
          onChange={(e)=>setNewProduct(
            {...newProduct,price:e.target.value
            }
          )}
          
          />
          <Input 
         
          placeholder='Image URL'
          name='image'
          value={newProduct.image}
          onChange={(e)=>setNewProduct(
            {...newProduct,image:e.target.value
            }
          )}
          
          />

          <Button onClick={handleAddProduct} > Add Product</Button>
         
          </VStack>

        </Box>
        </VStack>
    </Container>
    <ToastContainer />
    </>
  )
}

export default CreatePage;