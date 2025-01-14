"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { addItemToCart } from "@/redux/cartSlice";
import Category from '@/components/category';

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

const filter_category = [
  "smartphones",
  "lighting",
  "laptops",
  "skincare",
  "fragrances",
];

interface ProductComponentProps {
  initialProducts: Product[];
}

export default function Product({
  initialProducts,
}: ProductComponentProps) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    selectedCategories: [] as string[],
    minPrice: 0,
    maxPrice: 5000,
  });
  const [sortOption, setSortOption] = useState<string>('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Initialize filters from URL
  useEffect(() => {
    const categories = searchParams.get("categories")?.split(",") || [];
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 5000;
    const sort = searchParams.get("sort") || '';
    setFilters({
      selectedCategories: categories,
      minPrice,
      maxPrice,
    });
    setSortOption(sort);
  }, [searchParams]);

  // for Updating URL when filters or sort option change
  useEffect(() => {
    const { selectedCategories, minPrice, maxPrice } = filters;

    const params = new URLSearchParams();
    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));
    if (minPrice > 0) params.set("minPrice", String(minPrice));
    if (maxPrice < 5000) params.set("maxPrice", String(maxPrice));
    if (sortOption) params.set("sort", sortOption);

    router.replace(`?${params.toString()}`);
  }, [filters, sortOption, router]);

  // Fetch products based on filters, sort option, and page
  useEffect(() => {
    const { selectedCategories, minPrice, maxPrice } = filters;

    const categoryQuery =
      selectedCategories.length > 0
        ? `category=${selectedCategories.join(",")}`
        : "";

    const priceQuery = `minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const queryParams = [
      categoryQuery,
      priceQuery,
      `page=${page}`,
      "limit=10",
    ]
      .filter(Boolean)
      .join("&");
    const query = `https://fake-ecommerce-app-api.onrender.com/products?${queryParams}`;
    setIsLoading(true);

    fetch(query)
      .then((res) => res.json())
      .then((data) => {
        const fetchedProducts = data.products;

        setProducts((prev) => {
          const combinedProducts = page === 1 ? fetchedProducts : [...prev, ...fetchedProducts];
       
          const uniqueProducts = Array.from(new Set(combinedProducts.map((p:Product) => p.id)))
            .map(id => combinedProducts.find((p:Product) => p.id === id));
          
          if (sortOption === 'price-low-to-high') {
            return uniqueProducts.sort((a, b) => a.price - b.price);
          } else if (sortOption === 'price-high-to-low') {
            return uniqueProducts.sort((a, b) => b.price - a.price);
          } else if (sortOption === 'rating') {
            return uniqueProducts.sort((a, b) => b.rating - a.rating);
          }
          return uniqueProducts;
        });

        setHasMore(fetchedProducts.length > 0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, [filters, sortOption, page]);

  const handleFilters = (type: string, value: string | number) => {
    setFilters((prev) => {
      let updatedFilters;
      if (type === "category") {
        const key = "selectedCategories";
        updatedFilters = {
          ...prev,
          [key]: prev[key].includes(value as string)
            ? prev[key].filter((item) => item !== value)
            : [...prev[key], value as string], 
        };
      } else if (type === "minPrice" || type === "maxPrice") {
        updatedFilters = { ...prev, [type]: value };
      } else {
        updatedFilters = { ...prev };
      }
      return updatedFilters;
    });
    setPage(1);
    setProducts([]); 
  };

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: document.querySelector(".products-container"), threshold: 1.0 }
    );
    const currentObserverRef = observerRef.current;
    if (currentObserverRef) observer.observe(currentObserverRef);

    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [isLoading, hasMore]);

  const handleAddtoCart = (e: React.MouseEvent | React.KeyboardEvent, product: Product) => {
    e.stopPropagation();
    dispatch(addItemToCart({ item: product, quantity: 1 }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setPage(1);
    setProducts([]); 
  };

  return (
    <>
      <div className="p-4 ml-4">
        <h2>E-Commerce Shop App</h2>
        <p className="text-gray-500 text-wrap text-md">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum,
          mollitia laborum!
        </p>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex">
          {/* Filters */}
          <div className="w-1/4 p-4 overflow-y-auto h-[500px]">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div>
              <h2 className="font-bold text-2xl mb-2">Categories</h2>
              <ul className="space-y-2">
                {filter_category.map((category) => (
                  <Category
                    key={category}
                    category={category}
                    checked={filters.selectedCategories.includes(category)}
                    onChange={() => handleFilters("category", category)}
                  />
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="font-bold text-2xl mb-4">Price Range</h2>
              <div className="flex items-center space-x-4">
                {/* Min Price */}
                <div className="flex-1">
                  <label htmlFor="minPrice" className="block text-gray-600 text-sm mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    value={filters.minPrice === 0 ? '' : filters.minPrice}
                    onChange={(e) =>
                      handleFilters("minPrice", e.target.value === '' ? 0 : Number(e.target.value))
                    }
                    className="w-full border rounded-md p-2 text-sm"
                    min={0}
                  />
                </div>

                {/* Max Price */}
                <div className="flex-1">
                  <label htmlFor="maxPrice" className="block text-gray-600 text-sm mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    value={filters.maxPrice || ''}
                    onChange={(e) => {
                      handleFilters("maxPrice", e.target.value === '' ? 0 : Number(e.target.value))
                    }}
                    className="w-full border rounded-md p-2 text-sm"
                    min={0}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h2 className="font-bold text-2xl mb-4">Sort Results</h2>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full border rounded-md p-2 text-sm"
                aria-label="Sort products"
              >
                <option value="">Select</option>
                <option value="rating">Rating</option>
                <option value="price-low-to-high">Price (Low to High)</option>
                <option value="price-high-to-low">Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className="w-3/4 p-4">
            <div className="products-container h-[500px] overflow-y-auto" style={{ position: "relative" }}>
              <div className="mb-4">
                <p className="text-lg font-semibold">Showing {products.length} products</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product: Product,index) => (
                  
                    <div
                      className="border rounded-lg p-4 shadow-sm cursor-pointer"
                      tabIndex={0}
                      key={index}
                      role="link"
                      aria-label={`View details for ${product.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          router.push(`/products/${product.id}`);
                        }
                      }}
                    >
                      <Link href={`/products/${product.id}`} key={product.id} passHref>
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
                        <img src={product.image} alt={product.title} className="h-48 w-full object-cover object-center" />
                      </div>
                      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold ">Rating: {product.rating}</p>
                        <p className="text-sm font-semibold">${product.price}</p>
                      </div>
                      </Link>
                      <div className="mt-2">
                        <button
                          className="bg-black w-full text-white font-semibold text-sm p-2 border rounded-md"
                          onClick={(e) => handleAddtoCart(e, product)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleAddtoCart(e, product);
                            }
                          }}
                          tabIndex={0}
                          aria-label={`Add ${product.title} to cart`}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  
                ))}
              </div>
              <div ref={observerRef} className="h-10 mt-4"></div>
              {isLoading && (
                <div className="flex justify-center items-center mt-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}