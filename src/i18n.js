import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          clothing: "Clothing",
          accessories: "Accessories",
          about_us: "About Us",
          Search: "Search here...",
          signin: "Sign in",
          role_buyer: "I'm a buyer",
          role_seller: "Create my own shop",
          create_shop: "Create Your Shop",
          join_community: "Join our seller community and start selling today!",
          shop_name: "Shop Name",
          enter_shop_name: "Enter the name of your shop",
          check_availability: "Check Availability",
          name_available: "Name available",
          name_taken: "Name already taken",
          seller_name: "Seller Name",
          enter_seller_name: "Your name",
          email_address: "Email Address",
          enter_email: "Your email",
          password: "Password",
          create_password: "Create a password",
          confirm_password: "Confirm Password",
          main_category: "Main Category",
          select_category: "Select a category",
          category_clothing: "Clothing",
          category_accessories: "Accessories",
          category_handmade: "Handmade",
          shop_logo: "Shop Logo or Image",
          create_shop: "Create My Shop",
          page_facebook:"Your Facebook page",
          page_instagram:"Your Instagram page",
          link_instagram:"Link to your Instagram page",
          link_facebook:"Link to your Facebook page",
        }
      },
      fr: {
        translation: {
          clothing: "Habillement",
          accessories: "Accessoires",
          about_us: "À propos de nous",
          Search: "Recherche...",
          signin: "S'inscrire",
          role_buyer: "Je suis un acheteur",
          role_seller: "Créer ma boutique",
          create_shop: "Créer votre boutique",
          join_community: "Rejoignez notre communauté de vendeurs et commencez à vendre aujourd'hui !",
          shop_name: "Nom de la boutique",
          enter_shop_name: "Entrez le nom de votre boutique",
          check_availability: "Vérifier la disponibilité",
          name_available: "Nom disponible",
          name_taken: "Nom déjà pris",
          seller_name: "Nom du vendeur",
          enter_seller_name: "Votre nom",
          email_address: "Adresse e-mail",
          enter_email: "Votre e-mail",
          password: "Mot de passe",
          create_password: "Créez un mot de passe",
          confirm_password: "Confirmation du mot de passe",
          main_category: "Catégorie principale",
          select_category: "Sélectionnez une catégorie",
          category_clothing: "Vêtements",
          category_accessories: "Accessoires",
          category_handmade: "Artisanat",
          shop_logo: "Logo ou image de la boutique",
          create_shop: "Créer ma boutique",
          page_facebook:"Votre page Facebook",
          page_instagram:"Votre page Instagram",
          link_facebook:"Lien vers votre page Facebook",
          link_instagram:"Lien vers votre page Instagram",
        }
      }
    },
    lng: "fr", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
