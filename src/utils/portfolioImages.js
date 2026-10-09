const ctx = require.context(
  "../assets/images/portfolio",
  true,
  /\.(png|jpe?g|webp)$/
);

export function getPortfolioImage(relativePath) {
  try {
    return ctx(`./${relativePath}`);
  } catch {
    return "";
  }
}