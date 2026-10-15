export function toBengaliNumber(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /\d/g,
    (digit) => bengaliDigits[digit]
  );
}

export function formatPrice(value) {
  return `${toBengaliNumber(value)} টাকা`;
}

export function getUnitLabel(unit) {
  const units = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  return units[unit] || unit;
}

export function getChangeLabel(change) {
  if (!change || change.dir === "flat") {
    return "— ০.০%";
  }

  const arrow = change.dir === "up" ? "▲" : "▼";
  const percentage = Math.abs(change.pct);

  return `${arrow} ${toBengaliNumber(percentage)}%`;
}

export function getProductStats(product) {
  if (!product?.markets?.length) {
    return {
      min: 0,
      max: 0,
      average: 0,
    };
  }

  const min = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const max = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const average =
    product.markets.reduce((total, market) => {
      const midpoint = (market.min + market.max) / 2;
      return total + midpoint;
    }, 0) / product.markets.length;

  return {
    min,
    max,
    average: Math.round(average),
  };
}

export function getTopRisers(products, limit = 6) {
  return products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function getTopFallers(products, limit = 6) {
  return products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

// --- নিচে সাইন-আপ ও পাসওয়ার্ড সুরক্ষার নতুন কোড যোগ করা হলো ---

import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
