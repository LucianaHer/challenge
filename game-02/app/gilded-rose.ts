export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    var normalAdjust = 1; 
    var specialAdjust, finalQuality;
    this.items.forEach((it) => {
      it.sellIn--; //decremento un dia
      switch (it.name) {
        case "Sulfuras":
          finalQuality = 80;
          break;
        case "Backstage passes":
        case "Aged Brie":
          finalQuality = incrementQuality(normalAdjust, it.quality, it.sellIn);
          break;
        case "Conjured":
          normalAdjust = normalAdjust * 2;
        default:
          specialAdjust = normalAdjust * 2;
          finalQuality = decrementQuality(normalAdjust, specialAdjust, it.quality, it.sellIn);
          break;
      }
      finalQuality > 50
        ? (finalQuality = 50)
        : finalQuality <= 0
        ? (finalQuality = 0)
        : null;
      
      it.quality = finalQuality;
    });
    return this.items;

    //////
    function decrementQuality(normalAdjust, specialAdjust, quality, restDays) {
      let resultQuality;
      restDays > 0
        ? (resultQuality = quality - normalAdjust)
        : (resultQuality = quality - specialAdjust);
      return resultQuality;
    }
    ///////
    function incrementQuality(normalAdjust, quality, restDays) {
      let resultQuality, adjustPlus;
      restDays <= 0
        ? (resultQuality = 0)
        : (restDays <= 5
            ? (adjustPlus = 3)
            : restDays > 5 && restDays <= 10
            ? (adjustPlus = 2)
            : (adjustPlus = normalAdjust),
          (resultQuality = quality + adjustPlus));
      return resultQuality;
    }
  }
}
