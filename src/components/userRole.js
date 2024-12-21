
import axios from 'axios';

export async function UserRole() {
  try {
    
    const sellerResponse = await axios.get('/api/seller');
    if (sellerResponse.data && sellerResponse.data.shopName) {
      return 'seller'; 
    }

   
    const shopperResponse = await axios.get('/api/shopper');
    if (shopperResponse.data) {
      return 'shopper'; 
    }
    
    return null; 
  } catch (error) {
    console.error("Error detecting user role:", error);
    return null; 
  }
}
