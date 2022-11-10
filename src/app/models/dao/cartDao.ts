import { ISupplierCatogue } from "../supplierCatalogue";

export default interface ICartDao {
    id: number;
    supplierCatalog : ISupplierCatogue;
    quantity : number; 
}