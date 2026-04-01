import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Leaf,
  Loader2,
  MessageCircle,
  Palette,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Sun,
  Truck,
  Twitter,
  Wrench,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "./backend.d";
import {
  useAddToCart,
  useClearCart,
  useGetAllProducts,
  useGetCart,
  useRemoveFromCart,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

const WHATSAPP_NUMBER = "919845339697";

function openWhatsApp(message?: string) {
  const text = encodeURIComponent(
    message || "Hi! I'd like to book/enquire about your UPVC Garden Stands.",
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
}

const FALLBACK_IMAGES: Record<string, string> = {
  single: "/assets/generated/stand-product-1.dim_600x600.jpg",
  tiered: "/assets/generated/stand-product-2.dim_600x600.jpg",
  flat: "/assets/generated/stand-product-3.dim_600x600.jpg",
};

const CATEGORIES = [
  {
    name: "Single Frame Stand",
    image: "/assets/generated/stand-product-1.dim_600x600.jpg",
    category: "single",
  },
  {
    name: "3-Tier Stand",
    image: "/assets/generated/stand-product-2.dim_600x600.jpg",
    category: "tiered",
  },
  {
    name: "Flat Tray Stand",
    image: "/assets/generated/stand-product-3.dim_600x600.jpg",
    category: "flat",
  },
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "UPVC Single Frame Stand",
    description:
      "Sturdy single-level UPVC pipe frame stand — perfect for nurseries, terraces and balconies.",
    imageUrl: "/assets/generated/stand-product-1.dim_600x600.jpg",
    category: "single",
    price: 1600,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2n,
    name: "3-Tier UPVC Pipe Stand",
    description:
      "3-tier stand with mesh trays made from ISI-grade UPVC pipes — ideal for seedling trays and plant display.",
    imageUrl: "/assets/generated/stand-product-2.dim_600x600.jpg",
    category: "tiered",
    price: 4700,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 3n,
    name: "UPVC Flat Tray Stand",
    description:
      "Compact flat-tray UPVC pipe stand, great for holding seedling trays and pots in gardens or greenhouses.",
    imageUrl: "/assets/generated/stand-product-3.dim_600x600.jpg",
    category: "flat",
    price: 1299,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5n,
    name: "Twin Frame Stand Set",
    description:
      "Two matching UPVC pipe frame stands — ideal for symmetrical displays at garden entrances.",
    imageUrl: "/assets/generated/stand-product-1.dim_600x600.jpg",
    category: "single",
    price: 1699,
    rating: 4.6,
    inStock: true,
  },
  {
    id: 6n,
    name: "Wide Flat Tray Stand",
    description:
      "Extra-wide single-tier UPVC pipe stand with mesh tray — great for balcony and kitchen garden setups.",
    imageUrl: "/assets/generated/stand-product-3.dim_600x600.jpg",
    category: "flat",
    price: 1499,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 7n,
    name: "2-Tier UPVC Garden Stand",
    description:
      "2-tier UPVC pipe stand with mesh trays — perfect for seedling trays, pots and garden displays. Maintenance free and easy to assemble.",
    imageUrl:
      "/assets/chatgpt_image_apr_1_2026_06_32_56_pm-019d4924-857d-7257-a0a9-9f1a00879cca.png",
    category: "tiered",
    price: 2900,
    rating: 4.8,
    inStock: true,
  },
];

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

function StarRating({ rating }: { rating?: number }) {
  const r = rating ?? 0;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.round(r)
              ? "fill-star text-star"
              : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">
        ({r.toFixed(1)})
      </span>
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
  isAdding,
}: { product: Product; onAddToCart: (id: bigint) => void; isAdding: boolean }) {
  const imgSrc =
    product.imageUrl ||
    FALLBACK_IMAGES[product.category] ||
    "/assets/generated/stand-product-1.dim_600x600.jpg";
  const [_hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = product.id === 2n;

  const handleMouseEnter = () => {
    setHovered(true);
    if (showVideo && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (showVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-xl border border-border shadow-card overflow-hidden flex flex-col group"
    >
      <div
        className="aspect-square overflow-hidden bg-muted relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!showVideo && (
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
        {showVideo && (
          <video
            ref={videoRef}
            src="/assets/garden_upvc_pipe_stand_vdbuwvxf-019d4914-eaf8-730d-be4f-e053ea209bd8.mp4"
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-foreground text-sm leading-snug">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <p className="font-bold text-primary text-lg mt-auto">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
        {!product.inStock && (
          <Badge variant="secondary" className="w-fit text-xs">
            Out of Stock
          </Badge>
        )}
        <Button
          data-ocid="products.add_to_cart_button"
          size="sm"
          className="w-full mt-1 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!product.inStock || isAdding}
          onClick={() => onAddToCart(product.id)}
        >
          {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
}

function CartDrawer() {
  const { data: cartItems = [] } = useGetCart();
  const { data: allProducts = [] } = useGetAllProducts();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  const cartWithProducts = cartItems.map((item) => ({
    ...item,
    product:
      allProducts.find((p) => p.id === item.productId) ||
      SAMPLE_PRODUCTS.find((p) => p.id === item.productId),
  }));

  const totalCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );
  const totalPrice = cartWithProducts.reduce((sum, item) => {
    return sum + (item.product?.price ?? 0) * Number(item.quantity);
  }, 0);

  const handleWhatsAppCheckout = () => {
    const items = cartWithProducts
      .map(
        (item) =>
          `${item.product?.name ?? "Unknown"} x${String(item.quantity)} = ₹${((item.product?.price ?? 0) * Number(item.quantity)).toLocaleString("en-IN")}`,
      )
      .join("\n");
    const message = `Hi! I'd like to book the following Gardenstand items:\n\n${items}\n\nTotal: ₹${totalPrice.toLocaleString("en-IN")}`;
    openWhatsApp(message);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          data-ocid="header.cart_button"
          className="relative flex items-center gap-1.5 text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline text-sm font-medium">Cart</span>
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        data-ocid="cart.sheet"
        className="flex flex-col w-full sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping Cart
            {totalCount > 0 && (
              <Badge className="ml-1">
                {totalCount} item{totalCount !== 1 ? "s" : ""}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        {cartItems.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground"
          >
            <ShoppingCart className="h-12 w-12 opacity-30" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cartWithProducts.map((item, idx) => (
                <div
                  data-ocid={`cart.item.${idx + 1}`}
                  key={String(item.productId)}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  {item.product && (
                    <img
                      src={
                        item.product.imageUrl ||
                        FALLBACK_IMAGES[item.product.category]
                      }
                      alt={item.product.name}
                      className="h-14 w-14 object-cover rounded-md flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {item.product?.name ?? "Unknown Product"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {String(item.quantity)}
                    </p>
                    {item.product && (
                      <p className="text-sm font-semibold text-primary">
                        ₹
                        {(
                          item.product.price * Number(item.quantity)
                        ).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    data-ocid={`cart.delete_button.${idx + 1}`}
                    onClick={() => removeFromCart.mutate(item.productId)}
                    className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              {totalPrice >= 9999 && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Truck className="h-4 w-4" /> Free Delivery across Bangalore!
                </p>
              )}
              <Button
                data-ocid="cart.clear_button"
                variant="outline"
                className="w-full"
                onClick={() => clearCart.mutate()}
                disabled={clearCart.isPending}
              >
                {clearCart.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Clear Cart
              </Button>
              <Button
                data-ocid="cart.checkout_button"
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                onClick={handleWhatsAppCheckout}
              >
                <MessageCircle className="h-4 w-4" />
                Book via WhatsApp
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Bookings only via WhatsApp: +91 98453 39697
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-header border-b border-border shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 font-bold text-xl text-primary flex-shrink-0"
          aria-label="Gardenstand home"
        >
          <Leaf className="h-6 w-6" />
          <span>Gardenstand</span>
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {["home", "products", "why-us", "contact"].map((id) => (
            <button
              type="button"
              key={id}
              data-ocid={`nav.${id === "why-us" ? "why_us" : id}.link`}
              onClick={() => scrollTo(id)}
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors capitalize"
            >
              {id === "why-us"
                ? "Why Us"
                : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openWhatsApp()}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors p-2 rounded-lg hover:bg-green-50"
          >
            <MessageCircle className="h-5 w-5" />
            Book Now
          </button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="home"
      className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      <img
        src="/assets/generated/hero-stand-india.dim_1400x700.jpg"
        alt="UPVC pipe garden stands"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Gardenstand
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-2">
          Garden Pot Stand UPVC — rust-free &amp; made for Indian homes
        </p>
        <p className="text-sm text-white/80 mb-2 flex items-center justify-center gap-2">
          <Wrench className="h-4 w-4" /> Maintenance Free · Easily Dismantled
          &amp; Assembled
        </p>
        <p className="text-sm text-white/80 mb-8 flex items-center justify-center gap-2">
          <Truck className="h-4 w-4" /> Free Delivery on orders above ₹9,999
          across Bangalore
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            data-ocid="hero.shop_now_button"
            size="lg"
            onClick={scrollToProducts}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-semibold rounded-full shadow-lg"
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            onClick={() => openWhatsApp()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-semibold rounded-full shadow-lg gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Book via WhatsApp
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function CollectionsSection({
  onCategoryFilter,
}: { onCategoryFilter: (cat: string) => void }) {
  return (
    <section id="collections" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Browse our UPVC pipe stand range — designed for Indian balconies,
            nurseries &amp; gardens.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-xl overflow-hidden border border-border shadow-card bg-card cursor-pointer"
              onClick={() => {
                onCategoryFilter(cat.category);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-xl mb-1">
                  {cat.name}
                </h3>
                <span className="text-white/80 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Shop Now <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection({
  activeFilter,
  onClearFilter,
}: { activeFilter: string | null; onClearFilter: () => void }) {
  const { data: backendProducts, isLoading } = useGetAllProducts();
  const addToCart = useAddToCart();
  const [addingId, setAddingId] = useState<bigint | null>(null);

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : SAMPLE_PRODUCTS;
  const filtered = activeFilter
    ? products.filter((p) => p.category === activeFilter)
    : products;

  const handleAddToCart = async (productId: bigint) => {
    setAddingId(productId);
    try {
      await addToCart.mutateAsync({ productId, quantity: 1n });
      toast.success("Added to cart!");
    } catch {
      toast.error("Could not add to cart");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Featured Products
          </h2>
          {activeFilter && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <Badge className="text-sm py-1 px-3 bg-primary text-primary-foreground">
                {CATEGORIES.find((c) => c.category === activeFilter)?.name ??
                  activeFilter}
              </Badge>
              <button
                type="button"
                data-ocid="products.clear_filter_button"
                onClick={onClearFilter}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </motion.div>
        {isLoading ? (
          <div
            data-ocid="products.loading_state"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {SKELETON_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-xl border border-border overflow-hidden"
              >
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="products.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            <p className="text-lg">No products found in this category.</p>
            <button
              type="button"
              onClick={onClearFilter}
              className="mt-2 text-primary underline"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                onAddToCart={handleAddToCart}
                isAdding={addingId === product.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WhyUsSection() {
  const features = [
    {
      icon: Sun,
      title: "Heat & UV Resistant",
      desc: "ISI-grade UPVC pipes withstand India's harsh sun and monsoon rains year after year.",
    },
    {
      icon: Sparkles,
      title: "Maintenance Free",
      desc: "No painting, no rust, no rot — just wipe clean and enjoy. Zero upkeep required.",
    },
    {
      icon: Wrench,
      title: "Easy to Dismantle & Assemble",
      desc: "Simple snap-fit UPVC joints let you assemble or dismantle the stand in minutes — no tools needed.",
    },
    {
      icon: Shield,
      title: "Strong & Long-lasting",
      desc: "Heavy-duty UPVC pipe construction. Won't corrode, warp, or weaken over time.",
    },
    {
      icon: Palette,
      title: "Custom Sizes",
      desc: "Available in multiple sizes and configurations to fit every Indian home and nursery.",
    },
  ];
  return (
    <section id="why-us" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Why Gardenstand UPVC Stands?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Built for Indian climates — maintenance free, easy to assemble &amp;
            affordable.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center gap-4 p-6 bg-card rounded-xl border border-border shadow-card"
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-footer">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Book Your Order
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              All bookings are done exclusively via WhatsApp. Tap the button
              below to chat with us directly — we respond fast!
            </p>
            <div className="bg-card rounded-2xl border border-border shadow-card p-8 flex flex-col items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <MessageCircle className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  +91 98453 39697
                </p>
                <p className="text-muted-foreground text-sm">
                  WhatsApp only · Mon–Sat, 9 AM – 7 PM IST
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  📍 Bangalore, Karnataka
                </p>
              </div>
              <Button
                data-ocid="contact.whatsapp_button"
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 text-base font-semibold rounded-full shadow-lg gap-3"
                onClick={() => openWhatsApp()}
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
              <p className="text-xs text-muted-foreground">
                📍 Based in Bangalore · Free delivery on orders above ₹9,999
                across Bangalore
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Products", id: "products" },
    { label: "Why Us", id: "why-us" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-footer border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          <div>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 font-bold text-lg text-primary mb-3"
            >
              <Leaf className="h-5 w-5" />
              Gardenstand
            </button>
            <p className="text-sm text-muted-foreground">
              Premium UPVC pipe garden stands — maintenance free, easily
              dismantled &amp; assembled. Based in Bangalore. Built for Indian
              homes, balconies &amp; nurseries.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.facebook.link"
                aria-label="Facebook"
                className="p-2 rounded-full bg-card border border-border hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.instagram.link"
                aria-label="Instagram"
                className="p-2 rounded-full bg-card border border-border hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.twitter.link"
                aria-label="Twitter"
                className="p-2 rounded-full bg-card border border-border hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "_")}.link`}
                    onClick={() =>
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">
              Book via WhatsApp
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              All orders are booked exclusively through WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              +91 98453 39697
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Mon–Sat, 9 AM – 7 PM IST
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              📍 Bangalore, Karnataka
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>© {year} Gardenstand. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function GardenStandsApp() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CollectionsSection onCategoryFilter={setActiveFilter} />
        <ProductsSection
          activeFilter={activeFilter}
          onClearFilter={() => setActiveFilter(null)}
        />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GardenStandsApp />
    </QueryClientProvider>
  );
}
