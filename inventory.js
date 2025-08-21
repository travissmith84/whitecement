// inventory.js (enhanced) — ensures every paver card has a visible stock badge and avoids duplicates.

const inventoryStatus = {
  "euro-2pc-chestnut-buff-charcoal": "In Stock",
  "euro-2pc-creme-pecan-chocolate": "In Stock",
  "euro-2pc-malt-pecan-charcoal": "Low Stock",
  "euro-2pc-red-yellow-charcoal": "In Stock",
  "euro-2pc-vanilla-pecan-charcoal": "In Stock",
  "euro-2pc-white-charcoal": "Out of Stock",
  "euro-2pc-white-coconut-charcoal": "In Stock",
  "euro-2pc-white-vanilla-coconut": "Out of Stock",
  "apollo-white-charcoal": "Low Stock",
  "apollo-white-coconut-charcoal": "In Stock",
  "apollo-white-vanilla-coconut": "In Stock",
  "mega-smooth-white-charcoal": "Out of Stock",
  "mega-smooth-white-coconut-charcoal": "In Stock",
  "mega-smooth-white-vanilla-coconut": "In Stock",
  "mega-stone-white-charcoal": "In Stock",
  "mega-stone-white-coconut-charcoal": "In Stock",
  "mega-stone-white-vanilla-coconut": "In Stock",
  "4x8-white-charcoal": "In Stock",
  "4x8-white-coconut-charcoal": "Out of Stock",
  "4x8-white-vanilla-coconut": "In Stock",
  "bullnose-coping-white-charcoal": "In Stock",
  "bullnose-coping-white-coconut-charcoal": "In Stock",
  "bullnose-coping-white-vanilla-coconut": "In Stock",
  "remodel-coping-1-white-charcoal": "Low Stock",
  "remodel-coping-2.5-white-charcoal": "Low Stock",
  "remodel-coping-2.5-white-coconut-charcoal": "In Stock",
  "remodel-coping-2.5-white-vanilla-coconut": "In Stock",
  "remodel-coping-4-white-charcoal": "In Stock",
  "remodel-coping-4-white-coconut-charcoal": "In Stock",
  "remodel-coping-4-white-vanilla-coconut": "In Stock",
  "4x8-white-charcoal-2": "Low Stock",
  "4x8-white-coconut-charcoal-2": "In Stock",
  "4x8-white-vanilla-coconut-2": "In Stock",
  "bullnose-coping-white-charcoal-2": "In Stock",
  "bullnose-coping-white-coconut-charcoal-2": "In Stock",
  "bullnose-coping-white-vanilla-coconut-2": "In Stock",
  "remodel-coping-1-white-charcoal-2": "In Stock",
  "remodel-coping-2.5-white-charcoal-2": "In Stock",
  "remodel-coping-2.5-white-coconut-charcoal-2": "In Stock",
  "remodel-coping-2.5-white-vanilla-coconut-2": "In Stock",
  "remodel-coping-4-white-charcoal-2": "In Stock",
  "remodel-coping-4-white-coconut-charcoal-2": "In Stock",
  "remodel-coping-4-white-vanilla-coconut-2": "In Stock",
  "4x8-charcoal": "In Stock"
};

function statusToClass(status) {
  if (status === "In Stock") return "stock-in";
  if (status === "Low Stock") return "stock-low";
  return "stock-out"; // Out of Stock (or anything else)
}

function ensureBadge(card, statusText) {
  // If already has a badge, don't add another
  if (card.querySelector('.stock-badge')) return;
  const badge = document.createElement('div');
  badge.className = `stock-badge ${statusToClass(statusText)}`;
  badge.textContent = statusText;
  // Ensure positioning context
  if (getComputedStyle(card).position === 'static') {
    card.style.position = 'relative';
  }
  card.appendChild(badge);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('tri-circle-products');
  if (!container) return;

  // 1) Apply mapped statuses
  Object.entries(inventoryStatus).forEach(([id, status]) => {
    const card = document.getElementById(id);
    if (card) {
      ensureBadge(card, status);
    }
  });

  // 2) Fallback: any remaining .product-card missing badges gets default "In Stock"
  container.querySelectorAll('.product-card').forEach(card => {
    if (!card.querySelector('.stock-badge')) {
      ensureBadge(card, "In Stock");
    }
  });
});
