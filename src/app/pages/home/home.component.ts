import { Component, OnInit } from '@angular/core';
import { OrderDeatilsService } from 'src/app/services/order-deatils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foodData: any;

  constructor(private service: OrderDeatilsService) {
    
  }

  ngOnInit(): void {
    this.foodData = this.service.foodDeatils;
  }
}
