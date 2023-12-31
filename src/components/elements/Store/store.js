import style from "@/components/elements/Store/index.module.css";
import { useCartDispatchh } from "@/context/CartContext";
import Image from "next/image";

const Store = ({ products }) => {
  // console.log(products);

  const dispatch = useCartDispatchh()
  const handleAddtoCart = (product) =>{
    dispatch({
      type: "add",
      payload: product
    })
  }

  // Function to format the amount into Indonesian Rupiah currency format
  const formatCurrency = (amount) => {
    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount)) {
      return "Invalid Price";
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(numericAmount);
  };

  return (
    <>
      <div className={style["card-container"]}>
        {products.map((product) => {
          // Usage in your component
          const productPrice = product.price;
          const totalPrice = productPrice * 15108; // Calculate the total price based on the quantity
          const formattedPrice = formatCurrency(totalPrice);
          const priceWithoutCents = formattedPrice.replace(",00", "");
          return (
            <div key={product.id} className={style["card"]}>
              <div className={style["img-container"]}>
                <div className={style["img-product"]}>
                  <Image src={product.images[0]} fill style={{ objectFit: "contain"}} alt={product.title} />
                </div>
              </div>
              <div className="card-body">
                <div className="badge" style={{ backgroundColor: "#E62008", color: "white", border: "none" }}>
                  Hot Sales
                </div>
                <h2 className="card-title" style={{ color: "white" }}>
                  {priceWithoutCents}
                </h2>
                <div style={{height:"80px"}}>
                <p style={{ color: "white" }}>{product.title}</p>
                  </div>
                <div className="card-actions justify-end">
                  <button className="btn" style={{ backgroundColor: "var(--color-blue)", border: "none", color: "white" }} onClick={()=> handleAddtoCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Store;
