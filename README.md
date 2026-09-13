# Jolpai website

A complete static website for Jolpai Technologies Ltd. No build step or runtime dependency is required. Pages work on ordinary static hosting and preserve the original homepage, expertise, about, work, contact and project-example URLs.

## Preview

Run `python3 -m http.server 4173` from the repository, then open `http://localhost:4173`.

## Structure

- `index.html`: homepage, business-example tabs, process and FAQs.
- `expertise.html`: service directory; six dedicated service pages provide scope and example workflows.
- `portfolio-work.html`: illustrative business solutions, explicitly not claimed client results.
- `about.html`: company and founder background.
- `contact.html`: enquiry composer, email-app handoff and copy-message fallback.
- `privacy.html`: website and initial-enquiry privacy notice.
- `single-project-modern.html`: illustrative appointment workflow, preserving the original route.
- `404.html`: custom not-found page (configure the host to return HTTP 404 with this file).
- `assets/site.css` and `assets/site.js`: shared styling and behavior.
- `assets/jolpai-loop.png`: original generated brand artwork.
- `assets/manrope-*.ttf`: self-hosted Manrope font, licensed under the included SIL Open Font License.
- `robots.txt` and `sitemap.xml`: crawler configuration for `https://jolp.ai`.

## Enquiries

The current contact flow deliberately needs no backend or third-party form provider. It validates the fields, prepares a message, and lets the visitor review it before opening their email app. The visitor must send that email. Copying the message provides an alternative for webmail users. It never shows a false "message sent" confirmation.

The recipient is `info@jolpai.tech`, taken from the previous website. Verify that this inbox receives mail before public launch. There is no Calendly link, API key, analytics integration, persistent form storage or subscription dependency.

For direct form submission later, integrate a server-side email provider with validation, rate limiting and abuse protection. Do not reactivate the old template contact handler without reviewing it. The original vendor folders and PHP templates are retained in the existing repository but are not referenced by the redesigned pages; publish only the new HTML pages, `assets/`, `robots.txt` and `sitemap.xml` on static hosting.

## Content and launch details

- Country targeting and registration messaging were removed at the owner’s request. The primary website domain is https://jolp.ai; the contact email remains info@jolpai.tech.
- Founder experience comes from the supplied LinkedIn PDF. Previous employment is not described as Jolpai client work.
- Service examples are illustrative. No invented testimonials, client logos, revenue claims or performance guarantees are used.
- Before public deployment, align the privacy notice with the actual hosting/email providers, international transfers and retention practices. This site does not add tracking or nonessential cookies.
- Review the generated website in desktop and mobile browsers before launch. The assistant's live browser inspection was blocked by an unavailable admin-policy security check.
- Nothing in this redesign changes DNS, publishes the production website, pushes to GitHub or installs AI service implementations.

## Accessibility and motion

Semantic headings and landmarks, skip navigation, keyboard-operable tabs, native FAQ disclosures, labeled form fields, clear focus states and reduced-motion support. Main navigation stays visible without JavaScript. Enquiries have a direct-email fallback without JavaScript.

## Brand and experience update

- Custom olive-leaf J mark in the header, footer and favicon; standalone light/dark SVG marks in assets.
- Editorial engineering and infrastructure images are generated illustrations, labeled as such.
- Experience sections are based on the supplied founder profile and clearly attributed to prior employment, not Jolpai clients.
