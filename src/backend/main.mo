import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";

actor {
  // Data types
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    inStock : Bool;
    rating : ?Float;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type Enquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
    replied : Bool;
  };

  // Initialize products
  let products = Map.empty<Nat, Product>();

  let cart = List.empty<CartItem>();

  let enquiries = Map.empty<Nat, Enquiry>();

  var nextProductId = 1;
  var nextEnquiryId = 1;

  // Add initial products
  func addProduct(product : Product) {
    products.add(product.id, product);
  };

  func seedProducts() {
    let sampleProducts = [
      {
        id = nextProductId;
        name = "Tiered Plant Stand";
        description = "A beautiful tiered stand for flowers";
        price = 39.99;
        category = "Tiered Stands";
        imageUrl = "example.com/image.jpg";
        inStock = true;
        rating = null;
      },
    ];

    for (product in sampleProducts.values()) {
      addProduct(product);
      nextProductId += 1;
    };
  };

  seedProducts();

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.category == category }
    );
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    cart.clear();
    cart.add({ productId; quantity });
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    let newCart = cart.filter(
      func(item) { item.productId != productId }
    );
    cart.clear();
    cart.addAll(newCart.values());
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    cart.toArray();
  };

  public shared ({ caller }) func clearCart() : async () {
    cart.clear();
  };

  public shared ({ caller }) func submitEnquiry(name : Text, email : Text, message : Text) : async {
    id : Nat;
    timestamp : Time.Time;
  } {
    let id = nextEnquiryId;
    nextEnquiryId += 1;

    let enquiry : Enquiry = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
      replied = false;
    };

    enquiries.add(id, enquiry);

    { id; timestamp = enquiry.timestamp };
  };
};
