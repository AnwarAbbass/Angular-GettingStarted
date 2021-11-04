import { Component ,OnInit} from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle='Product List';
    imageWidth = 5;
    imageMargin=1;
    showImage=false;
    filteredProducts:IProduct[]=[];
    products:IProduct[]=[];
    
    performFilter(filterBy:string):IProduct[]{
      filterBy=filterBy.toLocaleLowerCase();
      return this.products.filter((p:IProduct)=>p.productName.toLocaleLowerCase().includes(filterBy));
    }
    private _productService;
    constructor(private productService : ProductService){
      this._productService=productService;
    }
    private _listFilter='';
    get listFilter():string{
      return this._listFilter;
    }
    set listFilter(val:string){
      this._listFilter=val;
      console.log(val);
      this.filteredProducts=this.performFilter(val);
      
    }

    toggleImage():void{
          this.showImage=!this.showImage;
    }
    ngOnInit():void{
      this.products=this.productService.getProduct();
      this.filteredProducts=this.products;
    }
    OnNotify(message:string):void{
      this.pageTitle='Product List '+message;
    }
}