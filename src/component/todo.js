import React, {useState, useEffect} from 'react'
import todo from "../component/images/todo.svg";
import "../App.css"

// to get the data from Local Storage

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
                 setToggleSubmit(true);

                 setInputData('');

                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

    
    // delete the items
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }
    // delete the items
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);

    }
    

    // remove all 
    const removeAll = () => {
         setItems([]);
    }

    // add data to localStorage
    useEffect(() => {
       localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add Your ToDo ✌</figcaption>
                    </figure>

                    <div className="todoItems">
                        <input type="text" placeholder="✍ Add Items..."
                           value={inputData} 
                           onChange={(e) => setInputData(e.target.value) }
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                 <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }
                       
                    </div>

                    <div className="showItems">
                        
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                  </div>
                                )
                            })

                        }
                       
                    </div>
                
                    {/* clear all button  */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CLEAR ALL </span> </button>
                    </div>
                </div>
          </div>  
        </>
    )
}

export default Todo
