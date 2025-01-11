// COLLECTIONS IMAGE
import collection1 from "../images/collections/collection-1.webp";
import collection2 from "../images/collections/collection-2.webp";
import collection3 from "../images/collections/collection-3.webp";
import collection4 from "../images/collections/collection-4.webp";
import collection5 from "../images/collections/collection-5.webp";

// BRAND IMAGES
import brand1 from "../images/brands/brand-1.webp";
import brand2 from "../images/brands/brand-2.webp";
import brand3 from "../images/brands/brand-3.webp";
import brand4 from "../images/brands/brand-4.webp";
import brand5 from "../images/brands/brand-5.webp";
import brand6 from "../images/brands/brand-6.webp";

// SOCIALS
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
} from "react-icons/fa";

// TOOL BAR ICONS
import { FaHome } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

// ABOUT ICON
import aboutIcon1 from "../images/about/about-icon-1.webp";
import aboutIcon2 from "../images/about/about-icon-2.webp";
import aboutIcon3 from "../images/about/about-icon-3.webp";
import aboutIcon4 from "../images/about/about-icon-4.webp";
import aboutIcon5 from "../images/about/about-icon-5.webp";
import aboutIcon6 from "../images/about/about-icon-6.webp";

// ABOUT TEAM
import member1 from "../images/about/member-1.webp";
import member2 from "../images/about/member-2.webp";
import member3 from "../images/about/member-3.webp";
import member4 from "../images/about/member-4.webp";
import member5 from "../images/about/member-5.webp";
import member6 from "../images/about/member-6.webp";

// BLOG SOCIALS
import { FaPinterestP, FaTumblr, FaTiktok } from "react-icons/fa6";
import {
  FaSnapchatGhost,
  FaYoutube,
  FaVimeoV,
  FaBehance,
  FaSoundcloud,
} from "react-icons/fa";

// PAYMENT IMAGES
import payment1 from "../images/payment/icon-1.svg";
import payment2 from "../images/payment/icon-2.svg";
import payment3 from "../images/payment/icon-3.svg";
import payment4 from "../images/payment/icon-4.svg";
import payment5 from "../images/payment/icon-5.svg";
import payment6 from "../images/payment/icon-6.svg";
import payment7 from "../images/payment/icon-7.svg";
import payment8 from "../images/payment/icon-8.svg";
import payment9 from "../images/payment/icon-9.svg";
import payment10 from "../images/payment/icon-10.svg";
import payment11 from "../images/payment/icon-11.svg";
import payment12 from "../images/payment/icon-12.svg";
import payment13 from "../images/payment/icon-13.svg";
import payment14 from "../images/payment/icon-14.svg";
import payment15 from "../images/payment/icon-15.svg";
import payment16 from "../images/payment/icon-16.svg";
import payment17 from "../images/payment/icon-17.svg";
import payment18 from "../images/payment/icon-18.svg";
import payment19 from "../images/payment/icon-19.svg";

// navbar
export const menus = [
  {
    path: "/shop",
    name: "shop",
  },
  {
    path: "/blog",
    name: "blogs",
  },
  {
    path: "/about",
    name: "about",
  },
  {
    path: "/contact",
    name: "contact",
  },
  {
    path: "/question",
    name: "question",
  },
];

export const tabs = [
  { title: "best seller" },
  { title: "featured" },
  { title: "sale" },
  { title: "top rate" },
];
export const tabsMode2 = [
  { title: "bedroom", categorType: "bedroom" },
  { title: "lighting & decor", categorType: "decor" },
  { title: "kitchen", categorType: "kitchen" },
  { title: "chair & sofa ", categorType: "sofa" },
  { title: "table", categorType: "table" },
];
export const collections = [
  {
    image: collection1,
    name: "Desks collection",
    count: 27,
  },
  {
    image: collection2,
    name: "Wall clock",
    count: 19,
  },
  {
    image: collection3,
    name: "Lamp shades",
    count: 85,
  },
  {
    image: collection4,
    name: "Accessories",
    count: 125,
  },
  {
    image: collection5,
    name: "Corner sofas &  chaises longues",
    count: 14,
  },
];
export const brands = [
  {
    image: brand1,
  },
  {
    image: brand2,
  },
  {
    image: brand3,
  },
  {
    image: brand4,
  },
  {
    image: brand5,
  },
  {
    image: brand6,
  },
];

// footer
export const menu = [
  " Who We Are",
  "Carrers",
  "Safety Recalls",
  "Design Trade",
  "Shipping",
  "Business Sales",
  "Gift Cards",
  "Policy",
  "Return Policy",
  "My Account",
  "Wishlist",
  "Your Order",
  "Email Preferences",
  "FAQs",
  "Manage Account",
  "Term of Use",
  "Blog",
  "Sitemap",
];
export const socials = [
  {
    icon: FaFacebookF,
    tootlip: "Follow on Facebook",
  },
  {
    icon: FaTwitter,
    tootlip: "Follow on Twitter",
  },
  {
    icon: FaInstagram,
    tootlip: "Follow on Instagram",
  },
  {
    icon: FaDribbble,
    tootlip: "Follow on Dribble",
  },
  {
    icon: FaLinkedinIn,
    tootlip: "Follow on Linkedin",
  },
];
export const toolBarIcons = [
  {
    icon: FaHome,
    title: "home",
    path: "/",
  },
  {
    icon: IoMdMenu,
    title: "menu",
    path: "#",
    clickEvent: true,
  },
  {
    icon: BsGrid,
    title: "shop",
    path: "/shop",
  },
  {
    icon: IoMdHeartEmpty,
    title: "wishlist",
    path: "/wishList",
  },
  {
    icon: FaRegUser,
    title: "account",
    path: "/",
  },
];

// shop page
export const subMenu = [
  {
    option: "Alphabetically, A-Z",
  },
  {
    option: "Alphabetically, Z-A",
  },
  {
    option: "Price, low to high",
  },
  {
    option: "Price, high to low",
  },
  {
    option: "Date, old to new",
  },
  {
    option: "Date, new to old",
  },
];

// about page
export const aboutIcons = [
  {
    image: aboutIcon1,
    title: "create unique",
    content:
      "Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis",
  },
  {
    image: aboutIcon3,
    title: "awards won",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione",
  },
  {
    image: aboutIcon5,
    title: "flexibility and patience",
    content:
      "Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc.",
  },
  {
    image: aboutIcon2,
    title: "fast delivery",
    content:
      "Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc.",
  },
  {
    image: aboutIcon4,
    title: "quality and security",
    content:
      "Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis",
  },
  {
    image: aboutIcon6,
    title: "support 24/7",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione",
  },
];
export const serviceInfo = [
  {
    title: "How can l search Gate Themes?",
    content:
      "We love to hear from you on our customer service, merchandise, website or any topics you want to share with us. Your comments and suggestions will be appreciated. Please complete the form below.",
  },
  {
    title: "Does the theme support Variant Image?",
    content:
      "Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
  },
  {
    title: "Excellence is not a skill",
    content:
      "We love to hear from you on our customer service, merchandise, website or any topics you want to share with us. Your comments and suggestions will be appreciated. Please complete the form below.",
  },
  {
    title: "How to setup this theme?",
    content:
      "Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
  },
  {
    title: "Product Design",
    content:
      "Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
  },
  {
    title: "24/7 Hours Support",
    content:
      "Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
  },
  {
    title: "We create digital services",
    content:
      "Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
  },
];
export const memberTeam = [
  {
    image: member1,
  },
  {
    image: member2,
  },
  {
    image: member3,
  },
  {
    image: member4,
  },
  {
    image: member5,
  },
  {
    image: member6,
  },
];

// asked page
export const questions = [
  {
    title: "shopping information",
    questionList: [
      {
        question: "Why won't my payment go through?",
        answer:
          "Ex Portland Pitchfork irure mustache. Neutra fap before they sold out literally Williamsburg. Aliquip ugh bicycle rights actually mlkshk, seitan squid craft beer tempor. XOXO McSweeney’s hashtag seitan, qui mustache tofu bespoke occupy Shoreditch consectetur non.",
      },
      {
        question: "Do You Ship Internationally?",
        answer:
          "Hoodie tote bag mixtape tofu. Typewriter jean shorts wolf quinoa, messenger bag organic freegan cray. Paleo Tumblr Wes Anderson photo booth. Kale chips Truffaut Williamsburg, hashtag fixie Pinterest raw denim chambray drinking vinegar Carles street art Bushwick gastropub. Wolf Tumblr paleo church-key. Plaid food truck Echo Park YOLO bitters hella, direct trade Thundercats leggings quinoa before they sold out.",
      },
      {
        question: "How Long Will It Take To Get My Package?",
        answer:
          "Swag slow-carb quinoa VHS typewriter pork belly brunch, paleo single-origin coffee Wes Anderson. Flexitarian Pitchfork forage, literally paleo fap pour-over. Wes Anderson Pinterest YOLO fanny pack meggings, deep v XOXO chambray sustainable slow-carb raw denim church-key fap chillwave Etsy. +1 typewriter kitsch, American Apparel tofu Banksy Vice.",
      },
      {
        question: "What Shipping Methods Are Available?",
        answer:
          "Neutra fap before they sold out literally Williamsburg. Aliquip ugh bicycle rights actually mlkshk, seitan squid craft beer tempor. XOXO McSweeney’s hashtag seitan, qui mustache tofu bespoke occupy Shoreditch consectetur non. Ex Portland Pitchfork irure mustache.",
      },
    ],
  },
  {
    title: "payment information",
    questionList: [
      {
        question: "What Payment Methods Are Accepted?",
        answer:
          "Fashion axe DIY jean shorts, swag kale chips meh polaroid kogi butcher Wes Anderson chambray next level semiotics gentrify yr. Voluptate photo booth fugiat Vice. Austin sed Williamsburg, ea labore raw denim voluptate cred proident mixtape excepteur mustache. Twee chia photo booth readymade food truck, hoodie roof party swag keytar PBR DIY.",
      },
      {
        question: "Is Buying On-Line Safe?",
        answer:
          "Is Buying On-Line Safe? Art party authentic freegan semiotics jean shorts chia cred. Neutra Austin roof party Brooklyn, synth Thundercats swag 8-bit photo booth. Plaid letterpress leggings craft beer meh ethical Pinterest.",
      },
    ],
  },
  {
    title: "orders and returns",
    questionList: [
      {
        question: "How do I place an Order?",
        answer:
          "Keytar cray slow-carb, Godard banh mi salvia pour-over. Slow-carb Odd Future seitan normcore. Master cleanse American Apparel gentrify flexitarian beard slow-carb next level. Raw denim polaroid paleo farm-to-table, put a bird on it lo-fi tattooed Wes Anderson Pinterest letterpress. Fingerstache McSweeney’s pour-over, letterpress Schlitz photo booth master cleanse bespoke hashtag chillwave gentrify.",
      },
      {
        question: "How Can I Cancel Or Change My Order?",
        answer:
          "Plaid letterpress leggings craft beer meh ethical Pinterest. Art party authentic freegan semiotics jean shorts chia cred. Neutra Austin roof party Brooklyn, synth Thundercats swag 8-bit photo booth.",
      },
      {
        question: "Do I need an account to place an order?",
        answer:
          "Thundercats swag 8-bit photo booth. Plaid letterpress leggings craft beer meh ethical Pinterest. Twee chia photo booth readymade food truck, hoodie roof party swag keytar PBR DIY. Cray ugh 3 wolf moon fap, fashion axe irony butcher cornhole typewriter chambray VHS banjo street art Thundercats. Gastropub selvage mlkshk swag, 8-bit 3 wolf moon.",
      },
      {
        question: "How Do I Track My Order?",
        answer:
          "Keytar cray slow-carb, Godard banh mi salvia pour-over. Slow-carb Odd Future seitan normcore. Master cleanse American Apparel gentrify flexitarian beard slow-carb next level. Raw denim polaroid paleo farm-to-table, put a bird on it lo-fi tattooed Wes Anderson Pinterest letterpress. Fingerstache McSweeney’s pour-over, letterpress Schlitz photo booth master cleanse bespoke hashtag chillwave gentrify. Pour-over Austin skateboard, street art irony roof party Shoreditch.",
      },
      {
        question: "Who should I to contact if I have any queries?",
        answer:
          "Fashion axe DIY jean shorts, swag kale chips meh polaroid kogi butcher Wes Anderson chambray next level semiotics gentrify yr. Voluptate photo booth fugiat Vice. Austin sed Williamsburg, ea labore raw denim voluptate cred proident mixtape excepteur mustache.",
      },
      {
        question: "How Can I Return a Product?",
        answer:
          "Kale chips Truffaut Williamsburg, hashtag fixie Pinterest raw denim chambray drinking vinegar Carles street art Bushwick gastropub. Wolf Tumblr paleo church-key. Plaid food truck Echo Park YOLO bitters hella, direct trade Thundercats leggings quinoa before they sold out. You probably haven’t heard of them wayfarers authentic umami drinking vinegar Pinterest Cosby sweater, fingerstache fap High Life.",
      },
    ],
  },
];

export const followSocials = [
  {
    icon: FaPinterestP,
    tootlip: "Follow on Pinterest",
    color: "rgba(203,32,39)",
  },
  {
    icon: FaTumblr,
    tootlip: "Follow on Tumblr",
    color: "rgba(55,69,92)",
  },
  {
    icon: FaSnapchatGhost,
    tootlip: "Follow on Snapchat",
    color: "rgba(255,221,0)",
  },
  {
    icon: FaYoutube,
    tootlip: "Follow on Youtube",
    color: "rgba(205,32,31)",
  },
  {
    icon: FaVimeoV,
    tootlip: "Follow on Vimeo",
    color: "rgba(26,183,234)",
  },
  {
    icon: FaBehance,
    tootlip: "Follow on Behance",
    color: "rgba(23,106,255)",
  },
  {
    icon: FaSoundcloud,
    tootlip: "Follow on Soundcloud",
    color: "rgba(255,119,0)",
  },
  {
    icon: FaTiktok,
    tootlip: "Follow on Tiktok",
    color: "#fe2c55",
  },
];

// product detail page
export const shareBtn = [
  {
    viewBox: "0 0 320 512",
    tootlip: "Facebook",
    path: "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z",
  },
  {
    viewBox: "0 0 512 512",
    tootlip: "Twitter",
    path: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
  },
  {
    viewBox: "0 0 384 512",
    tootlip: "Pinterest",
    path: "M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z",
  },
  {
    viewBox: "0 0 496 512",
    tootlip: "Telegram",
    path: "M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z",
  },
  {
    viewBox: "0 0 512 512",
    tootlip: "Email",
    path: "M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z",
  },
];
export const paymentImages = [
  {
    image: payment1,
  },
  {
    image: payment2,
  },
  {
    image: payment3,
  },
  {
    image: payment4,
  },
  {
    image: payment5,
  },
  {
    image: payment6,
  },
  {
    image: payment7,
  },
  {
    image: payment8,
  },
  {
    image: payment9,
  },
  {
    image: payment10,
  },
  {
    image: payment11,
  },
  {
    image: payment12,
  },
  {
    image: payment13,
  },
  {
    image: payment14,
  },
  {
    image: payment15,
  },
  {
    image: payment16,
  },
  {
    image: payment17,
  },
  {
    image: payment18,
  },
  {
    image: payment19,
  },
];
