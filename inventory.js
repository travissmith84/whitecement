
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

document.addEventListener("DOMContentLoaded", () => {
  Object.entries(inventoryStatus).forEach(([id, status]) => {
    const card = document.getElementById(id);
    if (card) {
      const badge = document.createElement("div");
      badge.textContent = status;
      badge.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: ${status === "In Stock" ? "#28a745" : status === "Low Stock" ? "#ffc107" : "#dc3545"};
        color: white;
        padding: 2px 8px;
        font-size: 0.8rem;
        font-weight: bold;
        border-radius: 4px;
      `;
      card.style.position = "relative";
      card.appendChild(badge);
    }
  });
});
