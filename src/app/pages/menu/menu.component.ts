import { Component, OnInit } from '@angular/core';
import { OrderDeatilsService } from 'src/app/services/order-deatils.service';
import { CartService, Food } from 'src/app/services/cart-services';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foodData: any;

  constructor(private service: OrderDeatilsService, private cartService: CartService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.foodData = this.service.foodDeatils.filter(food => food.foodName.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      else this.foodData = this.service.foodDeatils;
    })

  }

  addToCart(food: Food) {
    this.cartService.addToCart(food);
  }
}
