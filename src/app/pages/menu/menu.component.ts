import { Component, OnInit } from '@angular/core';
import { OrderDeatilsService } from 'src/app/services/order-deatils.service';
import { CartService, Food } from 'src/app/services/cart-services'; // Új import

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foodData: any;

  constructor(private service: OrderDeatilsService, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.foodData = this.service.foodDeatils;
  }

  addToCart(food: Food) {
    this.cartService.addToCart(food);
  }
}
