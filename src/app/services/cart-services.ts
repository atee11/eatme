// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDeatilsService } from './order-deatils.service';

export interface Food {
    id: number;
    foodName: string;
    foodPrice: string;
    foodImg: string;
}

export interface CartItem {
    food: Food;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsSubject = new BehaviorSubject<CartItem[]>([]);
    items$ = this.itemsSubject.asObservable();

    constructor(private orderService: OrderDeatilsService) { }

    addToCart(food: Food) {
        const items = this.itemsSubject.getValue();
        const item = items.find(item => item.food.id === food.id);
        if (item) {
            item.quantity++;
        } else {
            items.push({ food, quantity: 1 });
        }
        this.itemsSubject.next(items);
    }

    getItems() {
        return this.itemsSubject.getValue();
    }

    clearCart() {
        this.itemsSubject.next([]);
    }

    // Új metódus a mennyiség csökkentéséhez
    decreaseQuantity(food: Food) {
        const items = this.itemsSubject.getValue();
        const item = items.find(item => item.food.id === food.id);
        if (item && item.quantity > 1) {
            item.quantity--;
        } else if (item && item.quantity === 1) {
            this.removeFromCart(food);
        }
        this.itemsSubject.next(items);
    }

    // Új metódus a termék eltávolításához
    removeFromCart(food: Food) {
        const items = this.itemsSubject.getValue();
        const index = items.findIndex(item => item.food.id === food.id);
        if (index > -1) {
            items.splice(index, 1);
        }
        this.itemsSubject.next(items);
    }

    // Új metódus az összesített rendelés kiszámításához
    getTotal() {
        const items = this.itemsSubject.getValue();
        return items.reduce((total, item) => total + (item.quantity * parseFloat(item.food.foodPrice)), 0);
    }
}
