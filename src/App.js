import { useState } from "react";

function ProductCategoryRow({category})
{
  return<tr>
      <th colSpan='2'>
      {category}
      </th>
    </tr>
}

function ProductRow({product})
{
  const name=product.stocked ? product.name :
  <span style={{color:'red'}}>
    {product.name}
  </span>
  console.log(product.prize)
  return (
<tr>
      <td >
        {name}{'      '}
        {product.price}
      </td>
      
    </tr>
  );
}

function ProductTable({products ,filterText ,inStockOnly})
{
  
  let lastcategory=null;
  const row=[]
  products.forEach((product)=>{
    if(product.name.toLowerCase().indexOf(filterText.toLowerCase())===-1)
    {
      return ;
    }
    if (inStockOnly && !product.stocked)
    {
      return;
    }
    if (product.category!==lastcategory)
    {
      row.push(
        <ProductCategoryRow category={product.category} key={product.category}/>
      )
    }
    row.push(
      <ProductRow product={product} key={product.name}/>
    )
    lastcategory=product.category
  })
  return(
    <table>
      <thead>
        <tr>
          <th> Name</th>
          <th> Price</th>
        </tr>
      </thead>
      <tbody>
        {row}
      </tbody>
    </table>
  );
  
}

function SearchBar({filterText, inStockOnly,onFilterTextChange,onInStockOnlyChange})
{
  return (
    <form>
      <input type='text' placeholder='search ...' value={filterText}
      onChange={(e) => onFilterTextChange(e.target.value)}
      
      ></input>
      <label>
        <input type='checkbox' checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
        {' '}
        only show product in stock 
      </label>
    </form>
  )
}
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function FilterableProductTable({ products }) 
{
const [filterText,setFilterText]=useState('fruits')
const [inStockOnly,setInStockOnly]=useState(false)



  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly}/>
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/>
    </div>
  );
}

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
