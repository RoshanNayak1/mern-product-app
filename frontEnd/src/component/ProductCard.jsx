import { Box, Heading, HStack, Image, Text, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useProductStore } from '../store/product';

let ProductCard = ({ product }) => {
  const deleteProducts = useProductStore((state) => state.deleteProduct);
  const editProduct = useProductStore((state) => state.editProduct);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    ...product,
  });

 

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    console.log(success);
    console.log(message);
    
    
  };

  const handleEditProduct = async () => {
    const { success, message } = await editProduct(updatedProduct);
    console.log(success);
    console.log(message);
    setIsEditing(false); // Close the edit mode after saving
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
      {/* Image handling */}
      <Image
        src={updatedProduct.image}
        alt={updatedProduct.name}
        h={48}
        w='full'
        objectFit='cover'
      />
      <Box p={4}>
        {/* Editable Name */}
        <Heading as='h3' size='md' mb={2}>
          {isEditing ? (
            <Input
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              placeholder='Product Name'
            />
          ) : (
            product.name
          )}
        </Heading>

        {/* Editable Price */}
        <Text fontWeight='bold' fontSize='xl' mb={4}>
          {isEditing ? (
            <Input
              type='number'
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
              placeholder='Product Price'
            />
          ) : (
            `$${product.price}`
          )}
        </Text>

        {/* Editable Image URL */}
        {isEditing && (
          <Input
            value={updatedProduct.image}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, image: e.target.value })
            }
            placeholder='Image URL'
            mb={4}
          />
        )}

        <HStack>
          {isEditing ? (
            <Button onClick={handleEditProduct}>Save</Button>
          ) : (
            <MdEdit size={25} color='blue' onClick={() => setIsEditing(true)} />
          )}
          <MdDelete
            size={25}
            color='red'
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
