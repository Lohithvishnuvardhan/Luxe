import {
getFirestore,
collection,
getDocs,
deleteDoc,
doc,
} from 'firebase/firestore';
import { app } from '../config/firebase'; // adjust path if your firebase config is elsewhere

const db = getFirestore(app);

// Interface for product data
export interface Product {
id: string;
name: string;
price: number;
image: string;
}

// Fetch all products from Firestore
export const getAllProducts = async (): Promise<Product[]> => {
const querySnapshot = await getDocs(collection(db, 'products'));
const products: Product[] = [];
querySnapshot.forEach((docSnap) => {
const data = docSnap.data();
products.push({
id: docSnap.id,
name: data.name,
price: data.price,
image: data.image,
});
});
return products;
};

// Delete a product by ID
export const deleteProduct = async (productId: string): Promise<void> => {
await deleteDoc(doc(db, 'products', productId));
};