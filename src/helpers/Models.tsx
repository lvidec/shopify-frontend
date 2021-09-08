import { Sex } from "./Enums";



export default interface Models{

    JwtToken: {
        token: string;
    }

    UserAuthentication: {
        jwtToken: Models['JwtToken'];
        username: string;
        password: string;
    }

    User:{
        id: number;
        username: string;
        email?: string;
        password?: string;
        authorities: string[];
    }

    Product:{
        id: number;
        name: string;
        details?: string;
        price: number;
        img: string;
        brandName?: string;
        sex?: Sex;
        clothingType?: Models['ClothingType'];
        shoesType?: Models['ShoesType'];
    }

    ClothingType:{
        id: number;
        type: string;
    }

    Clothing:{
        id: number;
        name: string;
        details?: string;
        price: number;
        img: string;
        brandName: string;
        sex: Sex;
        clothingType: Models['ClothingType'];
    }

    ShoesType:{
        id: number;
        type: string;
    }

    Shoes:{
        id: number;
        name: string;
        details?: string;
        price: number;
        img: string;
        brandName: string;
        sex: Sex;
        shoesType: Models['ShoesType'];
    }

}