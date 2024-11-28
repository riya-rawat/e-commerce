export const apiUrl = "https://fakestoreapi.com/products";

export type itemType = {
    id: string | number,
    category: string,
    image: string,
    price: number
    title: string
    ratings: {rate:number, count: number}, 
    description:string
  }

export type productPropType = {
  initialData:{
    res: itemType[]
  }
}