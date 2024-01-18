import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDeatilsService } from 'src/app/services/order-deatils.service';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {

  getMenuId: any;
  menuData: any;

  constructor(private param: ActivatedRoute, private service: OrderDeatilsService) {
    
  }

  ngOnInit(): void {
    this.getMenuId = this.param.snapshot.paramMap.get('id');
    
    if (this.getMenuId) {
      this.menuData = this.service.foodDeatils.filter((value) => {
        return value.id == this.getMenuId;
      })
    }
  }

}
