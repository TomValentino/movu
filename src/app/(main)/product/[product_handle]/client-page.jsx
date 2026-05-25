"use client";

import { cartState } from "@/cart/cart-state";
import { HomePageProductsClient } from "@/components/home-products";
import { trackViewContent } from "@/facebook/fb-client";
import { useState, useRef, useEffect } from "react";

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 0.5L7.35 4.35H11.5L8.25 6.85L9.55 10.75L6 8.3L2.45 10.75L3.75 6.85L0.5 4.35H4.65L6 0.5Z"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6L8 11L13 6"/>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function MobileImageScroll({ images }) {
  return (
    <div className="image-scroll-mobile">
      <div className="image-scroll-track">
        {images.map((img, i) => (
          <div className="image-scroll-item" key={i}>
            <img src={img.url} alt={img.alt || ""} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Size chart table content
const SIZE_CHART_CONTENT = (
  <div className="size-chart-table-wrap">
    <table className="size-chart-table">
      <thead>
        <tr>
          <th>Size</th>
          <th>Chest (cm)</th>
          <th>Waist (cm)</th>
          <th>Hips (cm)</th>
          <th>Length (cm)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>XS</td><td>80–84</td><td>62–66</td><td>86–90</td><td>55</td></tr>
        <tr><td>S</td><td>84–88</td><td>66–70</td><td>90–94</td><td>56</td></tr>
        <tr><td>M</td><td>88–92</td><td>70–74</td><td>94–98</td><td>57</td></tr>
        <tr><td>L</td><td>92–96</td><td>74–78</td><td>98–102</td><td>58</td></tr>
        <tr><td>XL</td><td>96–100</td><td>78–82</td><td>102–106</td><td>59</td></tr>
      </tbody>
    </table>
    <p className="size-chart-note">
      Measurements are body measurements in centimetres. When between sizes, we recommend sizing up.
    </p>
  </div>
);

const SIZE_CHART_ACCORDION_ID = "size-chart";

function AccordionItem({ item, forceOpen, onForceOpenConsumed }) {
  const [open, setOpen] = useState(item.id === "desc");
  const panelRef = useRef(null);

  // When parent requests a forced open (e.g. from "Size guide →" click),
  // open the accordion and scroll it into view.
  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
      // Small timeout lets the panel expand before scrolling
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      onForceOpenConsumed?.();
    }
  }, [forceOpen]);

  return (
    <div
      className="accordion-item"
      id={item.id === SIZE_CHART_ACCORDION_ID ? SIZE_CHART_ACCORDION_ID : undefined}
      ref={panelRef}
    >
      <button className="accordion-trigger" onClick={() => setOpen(o => !o)}>
        {item.title}
        <span className={`accordion-chevron${open ? " open" : ""}`}>
          <ChevronIcon />
        </span>
      </button>
      <div className={`accordion-body${open ? " open" : ""}`}>
        <div className="accordion-content">{item.content}</div>
      </div>
    </div>
  );
}

const ACCORDIONS = [
  {
    id: "desc",
    title: "Product Description",
    content: null, // filled from product.description below
  },
  {
    id: "fabric",
    title: "Fabric & Care",
    content: (
      <ul>
        <li>Hand wash cold or delicate machine cycle (30°C)</li>
        <li>Do not tumble dry — lay flat or hang dry</li>
        <li>Iron on low heat with a pressing cloth</li>
      </ul>
    ),
  },
  {
    id: "shipping",
    title: "Shipping & Returns",
    content: (
      <ul>
        <li>Free standard shipping on orders over Rp 500.000</li>
        <li>Express 2-day delivery available across Indonesia</li>
        <li>International shipping to 30+ countries</li>
        <li>Free 30-day returns — no questions asked</li>
      </ul>
    ),
  },
  {
    id: "sizing",
    title: "Size & Fit",
    content: (
      <ul>
        <li>True to size — we recommend your usual size</li>
        <li>View full size guide for detailed measurements</li>
      </ul>
    ),
  },
  {
    id: SIZE_CHART_ACCORDION_ID,
    title: "Size Chart",
    content: SIZE_CHART_CONTENT,
  },
];

export function formatPrice(amount, currencyCode = "IDR") {
  if (currencyCode === "IDR") return `Rp ${Number(amount).toLocaleString("id-ID")}`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(amount);
}

export default function ProductPage({ product, similarProducts, similarProductCollectionId}) {

  const isAdding = cartState.use('isAdding')
  const colorOption = product.options.find(o => o.name === "Color");
  const sizeOption  = product.options.find(o => o.name === "Size");

  const colors = colorOption?.values ?? [];
  const sizes  = sizeOption?.values  ?? [];

  const [selectedColor, setSelectedColor] = useState(colors[0] ?? null);
  const [selectedSize,  setSelectedSize]  = useState(sizes[0]  ?? null);
  const [activeImage,   setActiveImage]   = useState(0);
  const [qty,           setQty]           = useState(1);

  // Tracks whether the size chart accordion should be force-opened + scrolled to
  const [openSizeChart, setOpenSizeChart] = useState(false);

  const selectedVariant = product.variants.find(v =>
    v.selected_options.every(opt => {
      if (opt.name === "Color") return opt.value === selectedColor;
      if (opt.name === "Size")  return opt.value === selectedSize;
      return true;
    })
  );


useEffect(() => {
  if (!product || !selectedVariant) return
  trackViewContent({
    value: selectedVariant.price ?? product.price,
    contentId: selectedVariant.id,
  })
}, [selectedVariant?.id])


  const isSoldOut = selectedVariant ? !selectedVariant.availableForSale : true;

  const hasCompare = product.compareAtPriceRange?.max?.amount > 0;
  const currentPrice  = selectedVariant?.price  ?? product.price;
  const comparePrice  = selectedVariant?.compare_at_price ?? product.compareAtPriceRange?.max?.amount;

  function handleAddToCart() {
    if (!selectedVariant) {
      console.warn("No variant selected");
      return;
    }
    cartState.addCartItem(product, selectedVariant, qty)
    console.log("Add to cart →", { variantId: selectedVariant.id, qty });
  }

  function handleSizeGuideClick(e) {
    e.preventDefault();
    setOpenSizeChart(true);
  }

  const accordions = ACCORDIONS.map(a =>
    a.id === "desc"
      ? { ...a, content: <p>{product.description}</p> }
      : a
  );

  const images = product.images;

  return (
    <>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span className="breadcrumb-sep">—</span>
        {product.collections?.[0] && (
          <>
            <a href={`/collection/${product.collections[0].id.split('/').pop()}`}>
              {product.collections[0].title}
            </a>
            <span className="breadcrumb-sep">—</span>
          </>
        )}
        <span className="breadcrumb-current">{product.title}</span>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-wrapper">
        <div className="product-grid">

          {/* LEFT — Images */}
          <div className="image-col">
            <div className="image-grid">
              <div className="img-main">
                <img
                  src={images[activeImage]?.url}
                  alt={images[activeImage]?.alt || product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`img-thumb${i === activeImage ? " active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img.url} alt={img.alt || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            <MobileImageScroll images={images} />
          </div>

          {/* RIGHT — Content */}
          <div className="content-col">

            {product.collections?.[1] && (
              <div className="product-collection">{product.collections[1].title}</div>
            )}

            <h1 className="product-title">{product.title}</h1>

            {/* Price */}
            <div className="product-price-row">
              <span className="price-current">{formatPrice(currentPrice, product.currencyCode)}</span>
              {hasCompare && comparePrice && (
                <>
                  <span className="price-original">{formatPrice(comparePrice, product.currencyCode)}</span>
                  <span className="price-badge">Sale</span>
                </>
              )}
            </div>

            {/* Color selector */}
            {colors.length > 0 && (
              <div className="selector-section">
                <div className="selector-label">
                  Colour
                  <span className="selector-label-value">{selectedColor}</span>
                </div>
                <div className="color-swatches">
                  {colors.map(color => (
                    <button
                      key={color}
                      className={`swatch${selectedColor === color ? " active" : ""}`}
                      title={color}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color}
                      style={{ background: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="selector-section">
                <div className="selector-label">
                  Size
                  {/* Clicking "Size guide →" opens & scrolls to the Size Chart accordion */}
                  <a
                    href={`#${SIZE_CHART_ACCORDION_ID}`}
                    className="size-guide-link"
                    onClick={handleSizeGuideClick}
                  >
                    Size guide →
                  </a>
                </div>
                <div className="size-grid">
                  {sizes.map(size => {
                    const variant = product.variants.find(v =>
                      v.selected_options.every(opt =>
                        opt.name === "Color" ? opt.value === selectedColor :
                        opt.name === "Size"  ? opt.value === size : true
                      )
                    );
                    const soldOut = variant ? !variant.availableForSale : false;
                    return (
                      <button
                        key={size}
                        className={`size-btn${selectedSize === size ? " active" : ""}${soldOut ? " sold-out" : ""}`}
                        onClick={() => !soldOut && setSelectedSize(size)}
                        aria-label={soldOut ? `${size} — Sold out` : size}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="cta-group">
              <button
                className="btn-atc"
                onClick={handleAddToCart}
                disabled={isSoldOut || isAdding}
              >
                {isSoldOut ? "Sold Out" : isAdding ? "Adding..." : "Add to Cart"}
              </button>

              <button className="btn-wishlist">
                <HeartIcon /> Save to Wishlist
              </button>
            </div>

            {/* Benefits strip */}
            <div className="benefits-strip">
              <div className="benefit-item">
                <span className="benefit-icon">✦</span>
                <span className="benefit-title">Free Shipping</span>
                <span className="benefit-sub">Orders over<br />Rp 500.000</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">◎</span>
                <span className="benefit-title">30-Day Returns</span>
                <span className="benefit-sub">No questions<br />asked</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">◈</span>
                <span className="benefit-title">Handcrafted</span>
                <span className="benefit-sub">Premium<br />quality</span>
              </div>
            </div>

            {/* Accordion */}
            <div className="accordion">
              {accordions.map(item => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  forceOpen={item.id === SIZE_CHART_ACCORDION_ID && openSizeChart}
                  onForceOpenConsumed={() => setOpenSizeChart(false)}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* FULL WIDTH SECTIONS */}
      <div className="full-sections">
        <HomePageProductsClient products={similarProducts} title="Similar products" moreId={similarProductCollectionId}   paginateBy={24}/>
      </div>

      {/* MOBILE STICKY ATC */}
      <div className="sticky-atc">
        <div className="sticky-atc-info">
          <div className="sticky-atc-name">{product.title}</div>
          <div className="sticky-atc-price">
            {formatPrice(currentPrice, product.currencyCode)}
            {selectedColor && ` · ${selectedColor}`}
            {selectedSize  && ` / ${selectedSize}`}
          </div>
        </div>
        <button className="sticky-atc-btn" onClick={handleAddToCart} disabled={isSoldOut}>
          {isSoldOut ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </>
  );
}