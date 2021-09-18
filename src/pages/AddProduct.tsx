import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Clothing from "../components/Clothing";
import { CartContext } from "../helpers/CartContext";
import { Sex } from "../helpers/Enums";
import Models from '../helpers/Models';

type Clothing = Models['Clothing'];
type ClothingType = Models['ClothingType']
type Shoes = Models['Shoes'];
type Shoesype = Models['ShoesType']

// const AddProduct = <T extends Models['Clothing']>() => {
const AddProduct = ({role}: {role: string}) =>{


    const history = useHistory();

    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [img, setImg] = useState('');
    const [brandName, setBrandName] = useState('');
    const [sex, setSex] = useState<Sex>(Sex.MALE);
    const [clothingTypeId, setClothingTypeId] = useState<number>(0);
    const [shoesTypeId, setShoesTypeId] = useState<number>(0);

    const { clothingContext, setClothingContext, shoes$} = useContext(CartContext);


    function isClothing(product: Clothing | Shoes): product is Clothing {
        return 'clothingType' in product;
    }

    function isShoes(product: Clothing | Shoes): product is Shoes {
        return 'shoesType' in product;
    }



    const addClothing = async (clothing: Clothing) => {
        try{
          const res = await fetch('http://localhost:8080/clothing/save', 
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(clothing)
          })
        
          if(res && res.ok){
            const data = await res.json();
            setClothingContext([...clothingContext, data]);
            return data;
          }
        }catch(e){
          console.log(e);
        }
          return;
    }

    const addShoes = async (shoes: Shoes) => {
        try{
          const res = await fetch('http://localhost:8080/shoes/save', 
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(shoes)
          })
        
          if(res && res.ok){
            const data = await res.json();
            shoes$.next([...clothingContext, data]);
            return data;
          }
        }catch(e){
          console.log(e);
        }
          return;
    }


    const onSubmit = (e: any) => {
        e.preventDefault();

        if(role === 'CLOTHING')
            addClothing({id: 0, name: name,details: details, price: price, brandName: brandName, img: img, sex: sex, clothingType: { id: clothingTypeId, type: "" }})

        else if(role === 'SHOES')
            addShoes({id: 0, name: name,details: details, price: price, brandName: brandName, img: img, sex: sex, shoesType: { id: shoesTypeId, type: "" }})


        console.log(name);
        console.log(details);
        console.log(price);
        console.log(img);
        console.log(brandName);
        console.log(sex);
        console.log(clothingTypeId);
        
        if(!name || !details || !price || !img || !brandName || (!clothingTypeId && !shoesTypeId) ){
            alert('Please add all info');
            return;
        }

            
        setName('');
        setDetails('');
        setPrice(0);
        setImg('');
        setBrandName('');
        setSex(Sex.FEMALE);
        setClothingTypeId(0);
        setShoesTypeId(0);

        history.push('/');
    }
        
        
    return(
        <div /*  className = {isActiveAdd ? '' : 'hidden'} */>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-group row mx-auto'>
                    <div className="col-md-5 mx-auto">
                        <label>Name</label>
                        <input className='form-control'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group row mx-auto'>
                    <div className="col-md-5 mx-auto">
                        <label>Details</label>
                        <input className='form-control'
                        type='text'
                        placeholder='Details'
                        value={details}
                        onChange={ (e) => setDetails(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group row mx-auto'>
                    <div className="col-md-5 mx-auto">
                        <label>Price</label>
                        <input className='form-control'
                        type='number'
                        placeholder='Price'
                        value={price}
                        onChange={ (e) => setPrice(parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <div className='form-group row mx-auto'>
                    <div className="col-md-5 mx-auto">
                        <label>Image url</label>
                        <input className='form-control'
                        type='text'
                        placeholder='Image url'
                        value={img}
                        onChange={ (e) => setImg(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group row mx-auto'>
                    <div className="col-md-5 mx-auto">
                        <label>Brand name</label>
                        <input className='form-control'
                        type='text'
                        placeholder='Brand name'
                        value={brandName}
                        onChange={ (e) => setBrandName(e.target.value)}
                        />
                    </div>
                </div>
                <br />
                <div className='form-group row mx-auto'>
                    <div className="col-md-5 mx-auto">
                        <label className='form-check-label'> Sex &nbsp;&nbsp;</label>
                        <input className='form-check-input'
                        type='checkbox'
                        onChange={ (e) => {
                            if(e.target.checked)
                            setSex(Sex.FEMALE);
                            else
                            setSex(Sex.MALE)
                        }}
                        />
                        <br />
                        <span style={{color: 'grey', fontSize: '0.8rem'}}>(Checked - 'FEMALE', Unchecked - 'MALE')</span>
                    </div>
                </div>
                <br />
                {role === 'CLOTHING' ?
                <div className="form-group row mx-auto">
                    <div className="col-md-5 mx-auto">
                        <label>Clothing type</label>
                        <select className='form-select' value={clothingTypeId} onChange={e => setClothingTypeId(parseInt(e.target.value))}>
                            <option value="0"></option>
                            <option value="1">Hoodie</option>
                            <option value="2">Shirt</option>
                            <option value="3">Jeans</option>
                        </select>
                    </div>
                </div>
                :
                <div className="form-group row mx-auto">
                    <div className="col-md-5 mx-auto">
                        <label>Shoes type</label>
                        <select className='form-select' value={shoesTypeId} onChange={e => setShoesTypeId(parseInt(e.target.value))}>
                            <option value="0"></option>
                            <option value="1">Sneakers</option>
                            <option value="2">Flip-Flops</option>
                            <option value="3">Sport</option>
                        </select>
                    </div>
                </div>}
                <br />
                <input type='submit' value='Save Product' className='btn btn-success btn-block'/>
            </form>
        </div>
    )
}

export default AddProduct;


