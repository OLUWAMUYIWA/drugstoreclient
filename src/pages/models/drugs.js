
export default class Drugs {
    constructor(name, description, brand, exp, batcn_no, company_name, quantity_available, product_image, price, location, uploader_id, time_uploaded) {
        this.name = name;
        this.description = description;
        this.company_name = company_name;
        this.brand = brand;
        this.exp = exp;
        this.batcn_no = batcn_no;
        this.quantity_available = quantity_available;
        this.product_image = product_image;
        this.price = price;
        this.location = location;
        this.uploader_id = uploader_id;
    }
}