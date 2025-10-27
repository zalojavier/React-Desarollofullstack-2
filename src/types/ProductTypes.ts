export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  category: string;
  price: string; // Se mantiene como string para coincidir con el modelo en Kotlin
  stock: number;
}

export interface ProductForm {
  imageUrl: string;
  name: string;
  category: string;
  price: string; // Se mantiene como string para coincidir con el modelo en Kotlin
  stock: number;
}