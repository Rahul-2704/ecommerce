'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { addItemToCart } from '@/redux/cartSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  __v: number;
}

const filter_category = ['smartphones', 'lighting','laptops','skincare','fragrances'];
const customer_rating = ['4 * & above', '3 * & above', '2 * & above', '1 * & above'];

interface ProductComponentProps {
  initialProducts: Product[];
}


export default function ProductComponent({ initialProducts }: ProductComponentProps) {
  
  const dispatch=useDispatch();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    selectedCategories: [] as string[],
    selectedRatings: [] as string[],
    minPrice: 0,
    maxPrice: 5000,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Initialize filters from URL
  useEffect(() => {
    const categories = searchParams.get('categories')?.split(',') || [];
    const ratings = searchParams.get('ratings')?.split(',') || [];
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 5000;

    setFilters({
      selectedCategories: categories,
      selectedRatings: ratings,
      minPrice,
      maxPrice,
    });
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const { selectedCategories, selectedRatings, minPrice, maxPrice } = filters;

    const params = new URLSearchParams();
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','));
    if (selectedRatings.length > 0) params.set('ratings', selectedRatings.join(','));
    if (minPrice > 0) params.set('minPrice', String(minPrice));
    if (maxPrice < 5000) params.set('maxPrice', String(maxPrice));

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  // Fetch products based on filters and page
  useEffect(() => {
    const { selectedCategories, selectedRatings, minPrice, maxPrice } = filters;

    // Reset products when filters change (except for pagination)
    if (page === 1) {
      setProducts([]);
    }

    const categoryQuery = selectedCategories.length > 0 ? `category=${selectedCategories.join(',')}` : '';
    const ratingQuery = selectedRatings.length > 0 ? `rating=${selectedRatings.join(',')}` : '';
    const priceQuery = `minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const queryParams = [categoryQuery, ratingQuery, priceQuery, `page=${page}`, 'limit=10']
      .filter(Boolean)
      .join('&');
    const query = `https://fake-ecommerce-app-api.onrender.com/products?${queryParams}`;

    setIsLoading(true);

    fetch(query)
      .then((res) => res.json())
      .then((data) => {
        if (page === 1) {
          setProducts(data.products); // Replace products on filter change
        } else {
          setProducts((prev) => [...prev, ...data.products]); // Append products on pagination
        }
        setHasMore(data.products.length > 0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, [filters, page]);

  // Handle filters
  const handleFilters = (type: string, value: string | number) => {
    setFilters((prev) => {
      let updatedFilters;
      if (type === 'category' || type === 'rating') {
        const key = type === 'category' ? 'selectedCategories' : 'selectedRatings';
        updatedFilters = {
          ...prev,
          [key]: prev[key].includes(value as string)
            ? prev[key].filter((item) => item !== value)
            : [...prev[key], value],
        };
      } else if (type === 'minPrice' || type === 'maxPrice') {
        updatedFilters = { ...prev, [type]: value };
      } else {
        updatedFilters = { ...prev };
      }
      return updatedFilters;
    });
    setPage(1); // Reset to page 1 when filters change
  };

  // Infinite scrolling within the fixed div
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: document.querySelector('.products-container'), threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading, hasMore]);

  return (
    <>
      <div className="p-4 ml-4">
        <h2>E-Commerce Shop App</h2>
        <p className="text-gray-500 text-wrap text-md">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, mollitia laborum!
        </p>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex">
          {/* Filters */}
          <div className="w-1/4 p-4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div>
              <h2 className="font-bold text-2xl mb-2">Categories</h2>
              <ul className="space-y-2">
                {filter_category.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.selectedCategories.includes(category)}
                      onChange={() => handleFilters('category', category)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <li className="text-gray-400">{category}</li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          {/* Products */}
          <div className="w-3/4 p-4">
            <div
              className="products-container h-[500px] overflow-y-auto"
              style={{ position: 'relative' }}
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product: Product) => (
                  <Link href={`/products/${product.id}`} className='cursor-pointer'>
                    <div key={product.id} className="border rounded-lg p-4 shadow-sm">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-48 w-full object-cover object-center"
                      />
                    </div>
                    <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <button onClick={()=>dispatch(addItemToCart(product))} className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
              <div ref={observerRef} className="h-10 mt-4"></div>
              {isLoading && 
              <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
