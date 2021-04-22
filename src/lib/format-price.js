export default function formatPrice(price) {
  return Intl.NumberFormat(
    'fr-FR',
    {
      style: 'currency',
      currency: 'EUR',
    }
  ).format(price);
}