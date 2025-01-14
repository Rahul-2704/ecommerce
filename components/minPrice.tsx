interface Filters {
  minPrice: number;
}

export default function MinPrice({filters, onChange}: {filters: Filters, onChange: () => void}) {
    return(
        <div className="flex-1">
                  <label
                    htmlFor="minPrice"
                    className="block text-gray-600 text-sm mb-1"
                  >
                    Min Price
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    value={filters.minPrice === 0 ? '' : filters.minPrice} 
                    onChange={onChange}
                    className="w-full border rounded-md p-2 text-sm"
                    min={0}
                  />
                </div>
    )
}