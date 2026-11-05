/**
 * MUT-3 Connector Landing Configuration
 * Centralized settings for pricing, payment link, seller legal info, and support contacts.
 *
 * NOTE FOR SELLER / DEVELOPER:
 * 1. purchaseEmail & emailSubject: target email and subject line for license purchase requests.
 * 2. inn and telegram support null: if set to null, their respective UI blocks are hidden.
 * 3. Update seller phone and personal details as needed.
 */

export const CONFIG = {
  product: {
    name: "MUT-3 Connector",
    fullName: "MUT-3 Connector for Mitsubishi MUT-III SE",
    version: "1.7.0",
    releaseYear: 2026,
    priceUsd: 15,
    priceEurDisplay: 14,
    priceRub: 1500,
    currencySymbolUsd: "$",
    currencySymbolEur: "€",
    currencySymbolRub: "₽",
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
     * Email configuration for license purchase requests
     */
    purchaseEmail: "alfaslash@gmail.com",
    emailSubjectRu: "Приобретение лицензии  MUT- 3 Connector",
    emailSubjectEn: "Purchase MUT-3 Connector License",

    /**
     * Hosted Robokassa payment URL (optional / backup).
     */
    robokassaUrl: "https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=MUT3CONNECTOR&OutSum=15&InvId=0&Desc=MUT-3+Connector+License&Culture=en",
    robokassaUrlRu: "https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=MUT3CONNECTOR&OutSum=1500&InvId=0&Desc=Лицензия+MUT-3+Connector&Culture=ru",
  },

  seller: {
    taxStatusEn: "Self-employed individual (NPD taxpayer, Russian Federation)",
    taxStatusRu: "Самозанятый гражданин / плательщик НПД (РФ)",
    nameEn: "Artem Roshko",
    nameRu: "Рошко Артём",
    inn: null, // Если null, блок с ИНН не выводится на сайте
    cityEn: "Yekaterinburg, Russian Federation",
    cityRu: "г. Екатеринбург, Российская Федерация",
    email: "alfaslash@gmail.com",
    phone: "+7 (702) 348-62-93",
    telegram: null, // Если null, блок с Telegram не выводится на сайте
  },

  links: {
    siteUrl: "https://mut3connector.com",
    termsEn: "terms/",
    termsRu: "ru/terms/",
    privacyEn: "privacy/",
    privacyRu: "ru/privacy/",
    refundEn: "refund/",
    refundRu: "ru/refund/",
    successPage: "payment-success/",
    failedPage: "payment-failed/",
  }
};
