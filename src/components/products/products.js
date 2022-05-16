import { useEffect, useState } from "react"

import ListItem from "../ListItems/ListItem"
import axios from "axios"
import Loader from "../UI/Loader"


const Product = () => {

    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true) 

    //  ......use of fetch api for network call, basically fetch api is the promise based api used for asynchronous calls

    //    useEffect(()=> {
    //       fetch(`https://lrkart-default-rtdb.firebaseio.com/items.json`)
    //       .then(response => response.json())
    //       .then(data => {
    //           console.log(data)
    //       })
    //        .catch(error => {
    //            console.log(error)
    //        })
    //    }, [])




        // .........use of axios for network call, basically axios is a third party package used for http calls, axios is also promise based

        //   useEffect(() =>  {
        //         axios.get('https://lrkart-default-rtdb.firebaseio.com/items.json')
        //         .then(response => {
        //            const data = response.data
        //            const transformedData = data.map((item, index)=> {
        //                return {
        //                    ...item,
        //                    id: index
        //                }
        //            })
        //           setItems(transformedData)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //   },[])



        //   .......use of async and await instead of .then and .catch

        useEffect(() => {
              async function fetchItems() {
                  try{
                    const response = await axios.get('https://lrkart-default-rtdb.firebaseio.com/items.json')
                    const data = response.data
                    const transformedData = data.map((item,index)=> {
                        return {
                            ...item,
                            id: index
                        }
                    })
                    
                    setItems(transformedData)
                  }
                  catch(error){
                  
                    console.log(error)
                    alert("Some error occured!!")
                  }
                  finally{
                      setLoader(false)
                  }
                 
              }

              fetchItems();
        },[])

        const updateItemTitle = async(itemId) => {
            // console.log(`Item with id: ${itemId}`)
            try{
                let title = `Updated title #Item-${itemId}`
                await axios.patch(`https://lrkart-default-rtdb.firebaseio.com/items/${itemId}.json`, {
                    title: title
                })

                let data = [...items]
                let index = data.findIndex(e => e.id === itemId)
                data[index]['title'] = title
                setItems(data)
              }
            catch(error){
                console.log(error)
            }
           
        }

    return (
        <>
          <div className={"product-list"}>
            <div className={"product-list--wrapper"}>
               
                    {/* <ListItem data={items[0]}></ListItem>
                    <ListItem data={items[1]}></ListItem> */}

                     {
                         items.map(item => {
                             return(<ListItem key = {item.id} data={item} updateItemTitle={updateItemTitle}/>)
                         })
                     }
                      

                      {/* the above map function will render data as below */}
                     {/* {[<ListItem data={item[0]}/>, <ListItem data={item[1]}/>, <ListItem data={item[2]}/>]} */}

                </div>
            </div>
            { loader && <Loader/>}
        </>
       
       
    )
}

export default Product