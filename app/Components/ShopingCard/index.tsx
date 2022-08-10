import { FC } from "react";
import { Button, Card } from "react-daisyui";
import { AiFillEye } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectItems } from "../../Slice/basketSlice";
import { IProduct, ShopCardProps } from "../../Types";

const ShoppingCard: FC<ShopCardProps> = ({ product, onClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItems)

  const addToBasket = (product: IProduct) => {
    dispatch(
      addItem({
        ...product,
        quantity: 1,
      })
    );
  };

  const checkItemExists = (id: string) => {
    const find = cartItems.filter(item => item._id === id)
    return !!find.length
  }

  return (
    <Card className="w-full md:w-[330px] lg:w-[375px]">
      <Card.Image
        src={product.images[0]}
        alt={product.title}
        className="rounded-md"
        loading="lazy"
      />
      <Card.Body>
        <Card.Title tag="h2">{product.title}!</Card.Title>
        <div className="flex justify-between flex-wrap items-center">
          <p className="text-sm text-red-500 font-bold">
            Price: ${product.price}
          </p>
          <p className="text-sm text-red-500 font-bold">
            In Stock: {product.inStock}
          </p>
        </div>
        <p>{product.content}</p>
        <Card.Actions className="justify-start">
        {checkItemExists(product._id) ? (
                <Button className='text-white rounded-full flex justify-center items-center'>
                  <BsFillCartCheckFill size={16} />
                </Button>
              ) : (
                <Button color="accent" onClick={() => addToBasket(product)} className='text-white rounded-full flex justify-center items-center'>
                  <FaCartPlus size={20} />
                </Button>
              )}
          <Button color="info" onClick={onClick}>
           <AiFillEye color="white" size={20} />
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};

export default ShoppingCard;
