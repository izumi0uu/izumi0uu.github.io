import type { ImageSizes } from "@/types/constants";

/** matches tailwindcss/defaultTheme.screens */

export const TW_WIDTHS = {
  /** @description XXS is added, for Image, bellow xs */
  XXS: 320,
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  _2XL: 1536,
} as const;

export const TW_SCREENS = {
  ...TW_WIDTHS,
  HEIGHTS: {
    XXS: 180,
    XS: 268,
    SM: 360,
    MD: 432,
    LG: 576,
    XL: 720,
    _2XL: 864,
  },
} as const;

// add quality and loading in future
export const IMAGE_SIZES = {
  FIXED: {
    BLUR_16_9: {
      width: 64,
      height: 36,
      quality: 20,
      loading: "eager",
    },
    AVATAR: {
      width: 48,
      height: 48,
      quality: 80,
      loading: "eager",
    },
    POST_CARD_SMALL: {
      width: 215,
      height: 120,
      quality: 75,
      loading: "lazy",
    },
    _404: {
      width: TW_SCREENS.MD,
      height: TW_SCREENS.HEIGHTS.MD,
      quality: 75,
      loading: "eager",
    },
    MDX_XXS: {
      width: TW_SCREENS.XXS,
      height: TW_SCREENS.HEIGHTS.XXS,
      quality: 75,
      loading: "lazy",
    },
    MDX_XS: {
      width: TW_SCREENS.XS,
      height: TW_SCREENS.HEIGHTS.XS,
      quality: 75,
      loading: "lazy",
    },
    MDX_SM: {
      width: TW_SCREENS.SM,
      height: TW_SCREENS.HEIGHTS.SM,
      quality: 75,
      loading: "lazy",
    },
    MDX_MD: {
      width: TW_SCREENS.MD,
      height: TW_SCREENS.HEIGHTS.MD,
      quality: 75,
      loading: "lazy",
    },
    MDX_LG: {
      width: TW_SCREENS.LG,
      height: TW_SCREENS.HEIGHTS.LG,
      quality: 75,
      loading: "lazy",
    },
    MDX_XL: {
      width: TW_SCREENS.XL,
      height: TW_SCREENS.HEIGHTS.XL,
      quality: 75,
      loading: "lazy",
    },
    /** @description width and height required for remote images: Astro does not handle, good for CLS */
    MDX_XXS_16_9: {
      width: TW_SCREENS.XXS,
      height: TW_SCREENS.HEIGHTS.XXS,
      quality: 75,
      loading: "lazy",
    },
    MDX_XS_16_9: {
      width: TW_SCREENS.XS,
      height: TW_SCREENS.HEIGHTS.XS,
      quality: 75,
      loading: "lazy",
    },
    MDX_SM_16_9: {
      width: TW_SCREENS.SM,
      height: TW_SCREENS.HEIGHTS.SM,
      quality: 75,
      loading: "lazy",
    },
    MDX_MD_16_9: {
      width: TW_SCREENS.MD,
      height: TW_SCREENS.HEIGHTS.MD,
      quality: 75,
      loading: "lazy",
    },
    MDX_LG_16_9: {
      width: TW_SCREENS.LG,
      height: TW_SCREENS.HEIGHTS.LG,
      quality: 75,
      loading: "lazy",
    },
    MDX_XL_16_9: {
      width: TW_SCREENS.XL,
      height: TW_SCREENS.HEIGHTS.XL,
      quality: 75,
      loading: "lazy",
    },
    MDX_2XL_16_9: {
      width: TW_SCREENS._2XL,
      height: TW_SCREENS.HEIGHTS._2XL,
      quality: 75,
      loading: "lazy",
    },
  },
  RESPONSIVE: {
    POST_CARD: {
      widths: [TW_SCREENS.XXS, TW_SCREENS.XS, TW_SCREENS.SM, TW_SCREENS.MD],
      sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XS}px, (max-width: ${TW_SCREENS.SM}px) ${TW_SCREENS.SM}px, (max-width: ${TW_SCREENS.MD}px) ${TW_SCREENS.MD}px, ${TW_SCREENS.XXS}px`,
      quality: 75,
      loading: "lazy",
    },
    POST_CARD_MORE: {
      widths: [TW_SCREENS.XXS, TW_SCREENS.XS, TW_SCREENS.SM],
      sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XS}px, (max-width: ${TW_SCREENS.SM}px) ${TW_SCREENS.SM}px, ${TW_SCREENS.XXS}px`,
      quality: 75,
      loading: "lazy",
    },
    POST_HERO: {
      widths: [TW_SCREENS.XS, TW_SCREENS.SM, TW_SCREENS.MD, TW_SCREENS.LG],
      sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XS}px, (max-width: ${TW_SCREENS.SM}px) ${TW_SCREENS.SM}px, (max-width: ${TW_SCREENS.MD}px) ${TW_SCREENS.MD}px, ${TW_SCREENS.LG}px`,
      quality: 80,
      loading: "eager",
    },
    PROJECT_CARD: {
      widths: [TW_SCREENS.XXS, TW_SCREENS.XS, TW_SCREENS.SM],
      sizes: `(max-width: ${TW_SCREENS.SM}px) ${TW_SCREENS.SM}px, (max-width: ${TW_SCREENS.MD}px) ${TW_SCREENS.XS}px, ${TW_SCREENS.XXS}px`,
      quality: 75,
      loading: "lazy",
    },
    MDX_EXPAND_LG: {
      widths: [
        TW_SCREENS.XS,
        TW_SCREENS.SM,
        TW_SCREENS.MD,
        TW_SCREENS.LG,
        TW_SCREENS.XL,
      ],
      sizes: `(max-width: ${TW_SCREENS.XS}px) ${TW_SCREENS.XS}px, (max-width: ${TW_SCREENS.MD}px) ${TW_SCREENS.MD}px, (max-width: ${TW_SCREENS.LG}px) ${TW_SCREENS.LG}px, ${TW_SCREENS.XL}px`,
      // for debugging
      debugClass: `border-8 border-blue-500 [@media(max-width:475px)]:!border-yellow-300 [@media(max-width:768px)]:border-orange-500 [@media(max-width:1280px)]:border-red-500`,
      quality: 70,
      loading: "lazy",
    },
    GALLERY_THUMBNAIL: {
      widths: [TW_SCREENS.XS, TW_SCREENS.SM],
      sizes: `(max-width: ${TW_SCREENS.SM}px) ${TW_SCREENS.SM}px, ${TW_SCREENS.XS}px`,
    },
  },
} as const satisfies ImageSizes;
