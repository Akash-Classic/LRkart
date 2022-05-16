import AddToCartIcon from "../../assets/icons/addcart.svg";
import {useState} from "react"

const ListItem = ({data, updateItemTitle}) => {
    // console.log(data);
      
    const [counter, setCounter] = useState(0)

    const descreaseCounterByOne = () => {
          if(counter>=1){
            setCounter(counter-1)
          }
           
    }
    
    const increaseCounterByOne = () => {
             setCounter(counter+1)
    }


    return (
        <div className={"item-card"}>
            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
            <div className={"item-card__information"}>
                   <div className={"pricing"}>
                       <span>₹{data.discountedPrice}</span>
                       <small >
                           <strike>₹{data.price}</strike>
                       </small>
                   </div>
                   <div className={"title"}>
                       <h3>{data.title}</h3>
                   </div>
                   </div>
                    <button onClick={() => updateItemTitle(data.id)}>Update the title</button>
                   {
                       counter<1 ? 
                       <button className={"cart-add"} onClick={increaseCounterByOne} >
                       <span>Add to cart</span>
                      <img src={AddToCartIcon} width="20" height="12" />
                       </button> 
                         :
                         <div className={"cart-addon"}>
                         <button onClick={descreaseCounterByOne}><span>-</span></button>
                         <span className={"counter"}>{counter}</span>
                         <button onClick={increaseCounterByOne}><span>+</span></button>
                         </div> 
                   }
                 
                   
   
        </div>
    )
}

export default ListItem