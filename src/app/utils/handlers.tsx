import Swal from "sweetalert2"
import { addToCart } from "../actions/actions"
import { Product } from "../types/product"

export const handleAddToCart = (e: React.MouseEvent, product:Product) => {
    e.preventDefault()
    Swal.fire({
      position : "top-right",
      icon : "success",
      title : `${product.name} added to cart`,
      showConfirmButton : false,
      timer : 1000
    })
    addToCart(product)
    
  }
