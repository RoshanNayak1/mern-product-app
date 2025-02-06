import { Box, Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React, { useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../component/ProductCard';
import { ToastContainer, toast } from 'react-toastify';


const Homepage = () => {
    const { fetchProducts, products } = useProductStore();
    const [prevProducts, setPrevProducts] = useState([]); // Track previous state


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // Ensure fetchProducts is stable (Zustand usually handles this well)
 
    useEffect(()=>{
        if(prevProducts.length===0){
            setPrevProducts(products)
            return;
        }

   
    
    //find deleted products
    if(prevProducts.length> products.length){
        toast.error("Product Deleted Successfully",{
            position:"bottom-center",
            autoClose: 1000,
            hideProgressBar:true,
            closeOnClick:true,
    
        });
    }
    // Find Updated Products
        if (prevProducts.length === products.length) {
            const updatedProduct = products.find((newProduct, index) => 
                newProduct.name !== prevProducts[index]?.name || 
                newProduct.price !== prevProducts[index]?.price || 
                newProduct.image !== prevProducts[index]?.image
            );

            if (updatedProduct) {
                toast.success("Product updated successfully!",{
                    position:"bottom-center",
            autoClose: 1000,
            hideProgressBar:true,
            closeOnClick:true,
    
                });
            }
        }

        setPrevProducts(products);
    
},[products])

    console.log("products:", products);

    

    //find updated products

    return (
        <>
        <Container maxW={'container.xl'} py={12}>
            <VStack spacing={12}>
                {/* Title */}
                <Text
                    fontSize={['xl', '2xl', '3xl']}
                    fontWeight={'bold'}
                    bgClip={'text'}
                    textAlign={'center'}
                    bgGradient="linear(to-r, red.400, blue.500)"
                >
                    Current Products
                </Text>

                {/* Product Grid */}
                <Box py={5} m={10}>
                <SimpleGrid
                    columns={{ base: 1, md: 5, lg: 3 }}
                    spacing={15}
                    gap={8}
                    w={'full'}
                >
                    {(products || []).map((product) => (
                        <ProductCard key={product._id} product={product} m={6}/>
                    ))}
                </SimpleGrid>
                </Box>
                {/* No Products Found Message */}
                {(!products || products.length === 0) && (
                    <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
                        No Products Found😥
                        <br />
                        <Link to={'/create'}>
                            <Text
                                as={'span'}
                                color={'blue.500'}
                                _hover={{ textDecoration: 'underline' }}
                                ml={2}
                            >
                                Create a Product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
                    <ToastContainer />

        </>
        
    );
};

export default Homepage;
