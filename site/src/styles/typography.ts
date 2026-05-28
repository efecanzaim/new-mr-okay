import type { CSSProperties } from "react";

/**
 * Mr. Okay typography tokens.
 *
 * Source of truth: DESIGN.md typography hierarchy.
 * The Uppercase-Label Rule: every CTA, nav link, badge, and pretitle uses these styles.
 */

export const HELVETICA_STACK = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/** Guerlain Label — uppercase CTA, nav link, button label. 13px / 0.092em / weight 400. */
export const navLinkStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "13px",
  fontWeight: 400,
  letterSpacing: "0.092em",
  textTransform: "uppercase",
  padding: "4px 8px",
  lineHeight: "16px",
};

/** Micro-label — category descriptions, soft pretitles. 11px / 0.04em. */
export const microLabelStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "11px",
  letterSpacing: "0.04em",
};

/** Ultra micro — smallest acceptable label; tracking is the personality. 10px / 0.35em / 700. */
export const ultraLabelStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  lineHeight: 1,
};

/* ─── Banner registers ─── */

/** Editorial display headline — Tom Ford style banner h2. 40px / -0.05em tight / 500. */
export const editorialDisplayStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "40px",
  fontWeight: 500,
  letterSpacing: "-0.05em",
  textTransform: "uppercase",
  lineHeight: 1,
};

/** Editorial subtitle — sits under editorial display. 13px / -0.031em / 400. */
export const editorialSubtitleStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "13px",
  fontWeight: 400,
  letterSpacing: "-0.031em",
  lineHeight: "16px",
};

/** Editorial CTA — underlined inline link, no button chrome. 13px / 0.05em / 500. */
export const editorialCtaStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

/** Editorial eyebrow — small uppercase "NEW" pretitle. 11px / 0.136em / 500. */
export const editorialEyebrowStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.136em",
  textTransform: "uppercase",
};

/** Guerlain banner h2 — centered, wide tracking. 24px / 0.083em / 500. */
export const bannerHeadlineStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "24px",
  fontWeight: 500,
  letterSpacing: "0.083em",
  textTransform: "uppercase",
  lineHeight: "27.4px",
};

/** Guerlain banner pretitle — sits above headline. 12px / 0.167em / 500. */
export const bannerPretitleStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.167em",
  textTransform: "uppercase",
  lineHeight: "13.7px",
};

/** Guerlain banner subtitle — sits between headline and CTA. 14px / 0.036em / 500. */
export const bannerSubtitleStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "14px",
  fontWeight: 500,
  letterSpacing: "0.036em",
  lineHeight: "20px",
};

/** Announcement bar — top-of-page promo strip. 14px / 0.04em / 400. */
export const announcementStyle: CSSProperties = {
  fontFamily: HELVETICA_STACK,
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: "0.04em",
  lineHeight: "20px",
};

/** Section headline — Playfair Display, on-page section titles ("BUSINESSMAN KOLEKSİYONU"). */
export const sectionHeadlineStyle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "32px",
  fontWeight: 500,
  letterSpacing: "0.02em",
  lineHeight: 1.15,
  textTransform: "uppercase",
};
