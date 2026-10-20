/**
 * MUT-3 Connector Landing Configuration
 * Centralized settings for pricing, payment link, seller legal info, and support contacts.
 *
 * NOTE FOR SELLER / DEVELOPER:
 * 1. Replace ROBOKASSA_PAYMENT_URL with your production hosted payment link before public launch.
 * 2. Update sellerInn, sellerPhone, and telegram if necessary.
 * 3. NEVER put Robokassa merchant secrets (Password #1 or #2) in this client-side code!
 */

export const CONFIG = {
  product: {
    name: "MUT-3 Connector",
    fullName: "MUT-3 Connector for Mitsubishi MUT-III SE",
    version: "1.7.0",
    releaseYear: 2026,
    priceUsd: 15,
    priceEurDisplay: 14,
    currencySymbolUsd: "$",
    currencySymbolEur: "€",
    licenseTypeEn: "Personal Perpetual License (1 PC / HWID-bound)",
    licenseTypeRu: "Персональная бессрочная лицензия (1 ПК / привязка к HWID)",
    typicalDeliveryHours: 12,
    maxDeliveryHours: 24,
    deliveryMethodEn: "Digital delivery via email (manual issuance)",
    deliveryMethodRu: "Электронная доставка на email (ручная выдача)",
    supportScopeEn: "Email installation & configuration assistance",
    supportScopeRu: "Email-поддержка по установке и настройке",
  },

  payment: {
    /**
     * Hosted Robokassa payment URL.
     * Can be a reusable payment link or hosted checkout form link.
     */
    robokassaUrl: "https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=MUT3CONNECTOR&OutSum=15&InvId=0&Desc=MUT-3+Connector+License&Culture=en",
  },

  seller: {
    taxStatusEn: "Self-employed individual (NPD taxpayer, Russian Federation)",
    taxStatusRu: "Самозанятый гражданин / плательщик НПД (РФ)",
    nameEn: "Artem Roshko",
    nameRu: "Рошко Артём",
    inn: "667000000000", // Плейсхолдер ИНН: укажите свой ИНН перед отправкой на модерацию
    cityEn: "Yekaterinburg, Russian Federation",
    cityRu: "г. Екатеринбург, Российская Федерация",
    email: "alfaslash@gmail.com",
    phone: "+7 (900) 000-00-00", // Плейсхолдер телефона
    telegram: "@mut3connector_support",
  },

  links: {
    siteUrl: "https://mut3connector.com",
    termsEn: "/terms/",
    termsRu: "/ru/terms/",
    privacyEn: "/privacy/",
    privacyRu: "/ru/privacy/",
    refundEn: "/refund/",
    refundRu: "/ru/refund/",
    successPage: "/payment-success/",
    failedPage: "/payment-failed/",
  }
};
