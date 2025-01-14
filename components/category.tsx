
export default function Category({category,checked,onChange}:{category:string,checked:boolean,onChange:()=>void}){
    return(
        <div key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={onChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <li className="text-gray-400">{category}</li>
                  </div>
    )
}