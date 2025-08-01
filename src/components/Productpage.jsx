import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Header from './Header';
import ProductImageGrid from './ProductImageGrid';
import ProductInfo from './ProductInfo';
import ProductOption from './ProductOption';
import SizeSelector from './SizeSelector';
import CheckboxOption from './CheckboxOption';
import QuantitySelector from './QuantitySelector';

const ProductPage = ({ onOpenCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedType, setSelectedType] = useState('UNSTITCHED');
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [hasLining, setHasLining] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const [user, loading] = useAuthState(auth);

  const typeOptions = ['UNSTITCHED', 'STITCHED'];
  const sizes = ['Small', 'Medium', 'Large', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No such product!');
        }
      } catch (err) {
        console.error('Error fetching product: ', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (loading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const userEmail = user.email;

    try {
      const q = query(
        collection(db, 'carts'),
        where('user', '==', userEmail),
        where('productId', '==', product.id),
        where('type', '==', selectedType),
        where('size', '==', selectedSize),
        where('lining', '==', hasLining)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const existingDoc = snapshot.docs[0];
        await updateDoc(existingDoc.ref, {
          quantity: existingDoc.data().quantity + quantity,
        });
      } else {
        const cartRef = doc(db, 'carts', `${userEmail}_${product.id}_${Date.now()}`);
        await setDoc(cartRef, {
          user: userEmail,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.coverImage,
          quantity,
          type: selectedType,
          size: selectedSize,
          lining: hasLining,
          createdAt: new Date(),
        });
      }

      if (onOpenCart) onOpenCart();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = () => {
    if (loading) return;

    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/buynowcheckout', {
      state: {
        product: {
          ...product,
          quantity,
          type: selectedType,
          size: selectedSize,
          lining: hasLining,
          price: product.price
        }
      }
    });
  };

  if (!product) return <div className="p-8 text-center">Loading product...</div>;

  const allImages = product.images
    ? [product.coverImage, ...product.images]
    : [product.coverImage];

  return (
    <div className="relative flex min-h-screen flex-col bg-[#FFDCDC] overflow-x-hidden">
      {showSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[100]">
          <div className="flex items-center gap-3 bg-green-100 border border-green-300 text-green-800 px-5 py-2 rounded-xl shadow-lg animate-fade-in-out transition-all">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}

      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5 flex-col md:flex-row">
          <div className="flex flex-col max-w-[920px] flex-1">
            <div className="flex w-full grow p-4"> {/* This div's background remains white to differentiate the image section */}
              <ProductImageGrid images={allImages} />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[360px]">
            <ProductInfo
              title={product.title}
              price={`PKR ${product.price}`}
              description={product.description}
              packageInfo={product.packageInfo || '3 PIECE'}
            />
{product.available ? (
  <p className="text-green-600 font-medium px-4">In Stock</p>
) : (
  <p className="text-red-600 font-medium px-4">Out of Stock</p>
)}

            {/* <ProductOption
              options={typeOptions}
              name="product-type"
              title="Type"
              selected={selectedType}
              onSelect={setSelectedType}
            /> */}
{/* 
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            /> */}

            {/* <CheckboxOption
              label="LINING"
              price="PKR 2500"
              checked={hasLining}
              onChange={setHasLining}
            /> */}

            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
            />
<div className="flex flex-col gap-3 p-4">
  <button
    onClick={handleAddToCart}
    className={`w-full border-2 py-3 px-4 rounded-xl font-medium text-base transition-colors ${
      product.available
        ? 'border-black text-black hover:bg-gray-100'
        : 'border-gray-400 text-gray-400 cursor-not-allowed'
    }`}
    disabled={!product.available}
  >
    Add to Cart
  </button>

  <button
    onClick={handleBuyNow}
    className={`w-full py-3 px-4 rounded-xl font-medium text-base transition-colors ${
      product.available
        ? 'bg-black text-white hover:bg-gray-800'
        : 'bg-gray-400 text-white cursor-not-allowed'
    }`}
    disabled={!product.available}
  >
    Buy Now
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;