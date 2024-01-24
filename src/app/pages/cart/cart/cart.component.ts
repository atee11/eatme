import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart-services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
[x: string]: any;
  items: any[] = [];

  constructor(public CartService: CartService) { } 

  ngOnInit() {
    this.items = this.CartService.getItems();
  }

  removeFromCart(food: any) {
    const index = this.items.indexOf(food);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}
