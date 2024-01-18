import { Component, OnInit } from '@angular/core';
import { OrderDeatilsService } from 'src/app/services/order-deatils.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foodData: any;

  constructor(private service: OrderDeatilsService) {

  }

  ngOnInit(): void {
    this.foodData = this.service.foodDeatils;
  }

}
