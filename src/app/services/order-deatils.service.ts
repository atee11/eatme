import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDeatilsService {

  constructor() {}

  foodDeatils = [
    {
      id: 1,
      foodName: "Pizza Margharita",
      foodPrice: "12",
      foodImg: "assets/images/food-1.jpg"
    },
    {
      id: 2,
      foodName: "Hamburger",
      foodPrice: "14",
      foodImg: "assets/images/food-2.jpg"
    },
    {
      id: 3,
      foodName: "Grilled Chicken",
      foodPrice: "13",
      foodImg: "assets/images/food-3.jpg"
    },
    {
      id: 4,
      foodName: "Cheesecake",
      foodPrice: "7.5",
      foodImg: "assets/images/food-4.jpg"
    },
    {
      id: 5,
      foodName: "Pancake",
      foodPrice: "6",
      foodImg: "assets/images/food-5.jpg"
    },
    {
      id: 6,
      foodName: "Grilled Beef",
      foodPrice: "15",
      foodImg: "assets/images/food-6.jpg"
    },
    {
      id: 7,
      foodName: "Vegetables",
      foodPrice: "9",
      foodImg: "assets/images/food-7.jpg"
    },
    {
      id: 8,
      foodName: "Mexican Soup",
      foodPrice: "11",
      foodImg: "assets/images/food-8.jpg"
    },
  ]
}


